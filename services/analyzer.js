'use strict';

const MAX_FILE_BYTES = 200000;
const MAX_FILES = 12;
const TIMEOUT_MS = 10000;

const CANDIDATE_FILES = [
  'README.md',
  'README.MD',
  'readme.md',
  'docs/README.md',
  'SKILL.md',
  'skill.md',
  'AGENTS.md',
  'agents.md',
  'CLAUDE.md',
  'package.json',
  'plugin.json',
  '.claude-plugin/plugin.json',
  'mcp.json'
];

const PLATFORM_PATTERNS = [
  ['Claude Code', /\bclaude code\b/i],
  ['Claude', /\bclaude\b(?! code)/i],
  ['Codex', /\bcodex\b/i],
  ['Cursor', /\bcursor\b/i],
  ['Gemini', /\bgemini\b/i],
  ['GitHub Copilot', /\bcopilot\b/i],
  ['Windsurf', /\bwindsurf\b/i],
  ['Cline', /\bcline\b/i]
];

function repoFromLink(link) {
  let url;

  try {
    url = new URL(String(link || '').trim());
  } catch (error) {
    return null;
  }

  const host = url.hostname.toLowerCase().replace(/^www\./, '');
  if (host !== 'github.com' && host !== 'gist.github.com') return null;

  const parts = url.pathname.split('/').filter(Boolean);
  if (parts.length < 2) return null;

  return {
    owner: parts[0],
    name: parts[1].replace(/\.git$/, ''),
    htmlUrl: `https://github.com/${parts[0]}/${parts[1].replace(/\.git$/, '')}`
  };
}

async function fetchWithTimeout(url, options) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, Object.assign({}, options, {
      signal: controller.signal,
      headers: Object.assign({
        Accept: 'application/json, text/plain, */*',
        'User-Agent': 'cortex-resource-analyzer/1.0'
      }, (options && options.headers) || {})
    }));

    if (!response.ok) return null;

    const text = await response.text();
    return text.slice(0, MAX_FILE_BYTES);
  } catch (error) {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function parseSections(text) {
  const lines = String(text || '').split(/\r?\n/);
  const sections = [{ heading: '', lines: [] }];
  let inCode = false;

  for (const line of lines) {
    if (/^\s*```/.test(line)) inCode = !inCode;

    const match = !inCode && line.match(/^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);

    if (match) {
      sections.push({ heading: match[2].trim(), lines: [] });
      continue;
    }

    sections[sections.length - 1].lines.push(line);
  }

  return sections.map((section) => ({
    heading: section.heading,
    text: section.lines.join('\n').trim()
  }));
}

function sectionText(sections, pattern) {
  return sections
    .filter((section) => pattern.test(section.heading))
    .map((section) => section.text)
    .join('\n\n');
}

function cleanItem(value) {
  return String(value || '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*|__/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*[-*+]\s+/, '')
    .replace(/^\s*\d+[.)]\s+/, '')
    .replace(/[.;:]+$/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function bullets(text) {
  return String(text || '')
    .split(/\r?\n/)
    .filter((line) => /^\s*(?:[-*+]|\d+[.)])\s+/.test(line))
    .map(cleanItem)
    .filter((item) => item.length >= 6 && item.length <= 160);
}

function codeBlocks(text) {
  const blocks = String(text || '').match(/```[\s\S]*?```/g) || [];
  return blocks
    .map((block) => block.replace(/^```[^\n]*\n?/, '').replace(/```$/, '').trim())
    .filter(Boolean);
}

function paragraphs(text) {
  return String(text || '')
    .split(/\n\s*\n/)
    .map((part) => cleanItem(part))
    .filter((part) => part.length >= 40 && part.length <= 400);
}

function unique(values) {
  const seen = new Set();

  return values.filter((value) => {
    const item = String(value || '').trim();
    const key = item.toLowerCase();

    if (!item || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function lowerFirst(value) {
  return String(value || '').charAt(0).toLowerCase() + String(value || '').slice(1);
}

function inferResourceType(haystack, hasSkillFile, hasBin) {
  const text = String(haystack || '');

  if (/model context protocol|\bmcp server\b/i.test(text)) return 'MCP Server';
  if (/skill collection|collection of \d+ (?:claude )?skills/i.test(text)) return 'Skill Collection';
  if (/\bplugin\b|\.claude-plugin\b/i.test(text)) return 'Plugin';
  if (hasBin || /\bcli tool\b|command.line (?:tool|interface)/i.test(text)) return 'CLI Tool';
  if (/\bframework\b/i.test(text)) return 'Framework';
  if (/\blibrary\b/i.test(text)) return 'Library';
  if (/\bapi\b/i.test(text)) return 'API';
  if (/documentation|\bdocs\b|\bguide\b|reference/i.test(text)) return 'Documentation';
  if (/\bworkflow\b|methodology/i.test(text)) return 'Workflow';
  if (hasSkillFile || /\bagent skill\b|\bclaude skill\b/i.test(text)) return 'Skill';
  return '';
}

function relatedFromText(text, resources, selfId) {
  const haystack = String(text || '').toLowerCase();

  return (Array.isArray(resources) ? resources : [])
    .filter((resource) => resource.id !== selfId)
    .filter((resource) => {
      const link = String(resource.link || '').toLowerCase().replace(/\/$/, '');
      const name = String(resource.name || '').toLowerCase();

      if (!link || !name) return false;
      return haystack.includes(link) || new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(haystack);
    })
    .map((resource) => resource.name)
    .slice(0, 5);
}

async function analyzeRepository(resource, options) {
  const opts = options || {};
  const repo = repoFromLink(resource && resource.link);

  if (!repo) throw new Error('Analyze Repository supports GitHub repositories only.');

  const apiHeaders = { Accept: 'application/vnd.github+json' };
  const repoJson = await fetchWithTimeout(
    `https://api.github.com/repos/${repo.owner}/${repo.name}`,
    { headers: apiHeaders }
  );

  let repoInfo = {};
  if (repoJson) {
    try {
      repoInfo = JSON.parse(repoJson);
    } catch (error) {
      repoInfo = {};
    }
  }

  const branches = unique([repoInfo.default_branch, 'main', 'master']).slice(0, 3);
  const files = [];
  const warnings = [];
  let sourceBranch = branches[0];

  for (const branch of branches) {
    const fetched = await Promise.all(CANDIDATE_FILES.slice(0, MAX_FILES).map(async (file) => {
      const raw = await fetchWithTimeout(
        `https://raw.githubusercontent.com/${repo.owner}/${repo.name}/${branch}/${file}`,
        { headers: { Accept: 'text/plain' } }
      );
      return raw ? { path: file, content: raw } : null;
    }));

    const present = fetched.filter(Boolean);
    if (present.length) {
      files.push(...present);
      sourceBranch = branch;
      break;
    }
  }

  if (!files.length) {
    warnings.push('No readable README, skill, agent, or package files were found.');
  }

  const allText = files.map((file) => file.content).join('\n\n');
  const readme = files.find((file) => /^readme/i.test(file.path));
  const skillFile = files.find((file) => /skill\.md$/i.test(file.path));
  const packageFile = files.find((file) => /(^|\/)package\.json$/i.test(file.path));

  let packageInfo = {};
  if (packageFile) {
    try {
      packageInfo = JSON.parse(packageFile.content);
    } catch (error) {
      warnings.push('package.json was found but could not be parsed.');
    }
  }

  const sections = parseSections(readme ? readme.content : allText);
  const featureText = sectionText(sections, /feature|capabilit|what (?:it|this) does|overview|about/i);
  const useText = sectionText(sections, /use when|when to use|use case|when should/i);
  const avoidText = sectionText(sections, /do not use|not for|limitation|caveat|avoid when/i);
  const installText = sectionText(sections, /install|getting started|quick ?start|setup|usage/i);

  const repoTopics = Array.isArray(repoInfo.topics) ? repoInfo.topics : [];
  const description = String(repoInfo.description || '').trim()
    || (paragraphs(sectionText(sections, /description|about|overview/i) || (readme ? readme.content : ''))[0] || '')
    || String((resource.discovery && resource.discovery.description) || '').trim();

  const capabilities = unique([
    ...bullets(featureText),
    ...bullets(sectionText(sections, /feature|capabilit/i))
  ]).slice(0, 12);

  const useWhen = unique([
    ...bullets(useText),
    ...capabilities.slice(0, 6).map((capability) => `Use when you need ${lowerFirst(capability)}`)
  ]).slice(0, 8);

  const doNotUseWhen = unique(bullets(avoidText)).slice(0, 5);
  const activationKeywords = unique([
    repo.name,
    ...repoTopics,
    ...capabilities.slice(0, 8).map((capability) => capability.split(/\s+/).slice(0, 5).join(' ')),
    ...sections.filter((section) => /feature|capabilit|use case/i.test(section.heading)).map((section) => section.heading)
  ]).slice(0, 20);

  const supportedPlatforms = PLATFORM_PATTERNS
    .filter(([, pattern]) => pattern.test(allText))
    .map(([name]) => name);

  const installationInstructions = unique([
    ...codeBlocks(installText).map((block) => block.slice(0, 400)),
    ...paragraphs(installText)
  ]).join('\n\n').slice(0, 2000);

  const documentationUrl = (/^https?:\/\//.test(repoInfo.homepage || '')
    ? repoInfo.homepage
    : repo.htmlUrl);

  const haystack = [repo.name, repoInfo.description, allText, Object.keys(packageInfo.scripts || {}).join(' ')].join(' ');
  const resourceType = inferResourceType(haystack, Boolean(skillFile), Boolean(packageInfo.bin));
  const evidence = unique(files.map((file) => {
    const sample = cleanItem(file.content.split(/\r?\n/).filter((line) => line.trim().length > 40)[0] || '');
    return sample ? `${file.path}: ${sample.slice(0, 180)}` : '';
  })).slice(0, 8);

  return {
    source: {
      repository: repo.htmlUrl,
      branch: sourceBranch,
      files: files.map((file) => file.path)
    },
    suggestions: {
      description,
      resource_type: resourceType,
      capabilities,
      use_when: useWhen,
      do_not_use_when: doNotUseWhen,
      activation_keywords: activationKeywords,
      supported_platforms: supportedPlatforms,
      installation_instructions: installationInstructions,
      documentation_url: documentationUrl,
      related_resources: relatedFromText(allText, opts.resources, resource.id),
      verification_status: files.length ? 'Partially Verified' : 'Unverified',
      last_verified_at: new Date().toISOString()
    },
    evidence,
    warnings
  };
}

module.exports = { analyzeRepository, repoFromLink, parseSections };
