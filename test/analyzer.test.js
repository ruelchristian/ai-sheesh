'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const analyzer = require('../services/analyzer');

const README = [
  '# Demo Skill',
  '',
  'A short description.',
  '',
  'Mentioning Cursor here is not a compatibility claim.'
].join('\n');

const SKILL = [
  '# Demo Skill',
  '',
  '## Features',
  '- Analyzes repository security posture',
  '- Generates design review notes',
  '',
  '## Limitations',
  '- Not for production incident response',
  '',
  '## Installation',
  '```bash',
  'npm install -g demo-skill',
  '```'
].join('\n');

function response(body, ok = true) {
  return { ok, text: async () => body };
}

test('repoFromLink parses GitHub owner and repo', () => {
  const repo = analyzer.repoFromLink('https://github.com/ruelchristian/ai-sheesh.git');
  assert.equal(repo.owner, 'ruelchristian');
  assert.equal(repo.name, 'ai-sheesh');
  assert.equal(repo.htmlUrl, 'https://github.com/ruelchristian/ai-sheesh');
});

test('parseSections ignores headings inside code fences', () => {
  const sections = analyzer.parseSections(['# One', 'text', '```md', '# Fake', '```'].join('\n'));
  assert.deepEqual(sections.map((section) => section.heading), ['', 'One']);
});

test('secondary categories come from repo topics and existing categories', () => {
  const found = analyzer.secondaryCategoriesFromTopics(
    ['security', 'design-system'],
    [{ category: 'Security' }, { category: 'Design & UI' }, { category: 'Coding Workflow' }],
    'Coding Workflow'
  );
  assert.deepEqual(found, ['Security', 'Design & UI']);
});

test('analyzeRepository mines SKILL.md without inventing verification or platforms', async () => {
  const originalFetch = global.fetch;

  global.fetch = async (url) => {
    const target = String(url);

    if (target.includes('api.github.com/repos/')) {
      return response(JSON.stringify({
        description: 'Demo security and design skill',
        topics: ['security', 'design-system'],
        default_branch: 'main',
        homepage: ''
      }));
    }

    if (target.endsWith('/SKILL.md')) return response(SKILL);
    if (target.endsWith('/README.md')) return response(README);
    return response('', false);
  };

  try {
    const analysis = await analyzer.analyzeRepository(
      {
        id: 99,
        name: 'demo-skill',
        link: 'https://github.com/example/demo-skill',
        category: 'Coding Workflow',
        discovery: {}
      },
      {
        resources: [
          { id: 1, name: 'other', link: 'https://example.com/other', category: 'Security' },
          { id: 2, name: 'ui', link: 'https://example.com/ui', category: 'Design & UI' }
        ]
      }
    );

    assert.ok(analysis.suggestions.capabilities.includes('Analyzes repository security posture'));
    assert.ok(analysis.suggestions.capabilities.includes('Generates design review notes'));
    assert.ok(analysis.suggestions.do_not_use_when.includes('Not for production incident response'));
    assert.ok(analysis.suggestions.installation_instructions.includes('npm install -g demo-skill'));
    assert.ok(analysis.suggestions.secondary_categories.includes('Security'));
    assert.ok(analysis.suggestions.secondary_categories.includes('Design & UI'));
    assert.equal(analysis.suggestions.verification_status, '');
    assert.equal(analysis.suggestions.last_verified_at, '');
    assert.ok(!analysis.suggestions.supported_platforms.includes('Cursor'));
    assert.ok(analysis.source.files.includes('SKILL.md'));
  } finally {
    global.fetch = originalFetch;
  }
});
