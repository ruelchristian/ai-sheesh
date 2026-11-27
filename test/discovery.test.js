'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

global.window = {};
require('../data/meta.js');

const discovery = require('../services/discovery');
const { createDiscoveryService } = require('../services/discovery-service');

const resources = Object.keys(window.META).map((key, index) => {
  const meta = window.META[key];
  return {
    id: index + 1,
    name: key,
    link: meta.link,
    category: meta.category,
    discovery: meta
  };
});

const cases = [
  ['Find a tool for making modern responsive websites.', 'modern-web-guidance'],
  ['Find something that helps AI agents remember past sessions.', 'Claude-mem'],
  ['Find a skill for generating animations in React.', 'Framer Motion (Motion)'],
  ['Find a tool that analyzes codebase architecture.', 'Floorplan'],
  ['Find a skill that reduces token consumption.', 'caveman'],
  ['Find a resource for editing videos with FFmpeg.', 'ffmpeg-skill'],
  ['Find skills for startup planning.', 'founder'],
  ['Which skill can help me remember previous sessions?', 'Claude-mem'],
  ['I need an animation library for React', 'Framer Motion (Motion)'],
  ['find a resource to plan a startup', 'founder'],
  ['how can I reduce context token usage?', 'context-monitor'],
  ['recommend a tool for website design critique', 'Impeccable']
];

for (const [query, expected] of cases) {
  test(query, () => {
    const results = discovery.searchResources(resources, query, { limit: 5 });
    assert.ok(results.length > 0);
    assert.equal(results[0].name, expected);
    assert.ok(results[0].reasons.length > 0 || results[0].matching_capabilities.length > 0);
  });
}

test('results explain capability and use-case matches', () => {
  const found = discovery.searchResources(resources, 'Which skill can help me remember previous sessions?', { limit: 1 })[0];
  assert.ok(found.reasons.some((reason) => reason.startsWith('Capability:')));
  assert.ok(found.reasons.some((reason) => reason.startsWith('Use case:')));
  assert.ok(found.matching_use_cases.length > 0);
});

test('tokenize normalizes inflections through synonyms', () => {
  assert.deepEqual(discovery.tokenize('animated animations'), ['animation']);
  assert.deepEqual(discovery.tokenize('remembered remembering'), ['memory']);
});

test('cleanQuery strips conversational phrasing', () => {
  assert.equal(discovery.cleanQuery('Could you recommend a skill for video editing?'), 'video editing?');
});

test('findResourcesForTask strips request phrasing', () => {
  const found = discovery.findResourcesForTask(resources, 'Find skills for startup planning.', { limit: 3 });
  assert.equal(found.query, 'skills for startup planning.');
  assert.equal(found.results[0].name, 'founder');
});

test('phrase matching respects word boundaries', () => {
  const resource = { id: 1, name: 'Starter', category: '', discovery: { description: 'Start here' } };
  assert.equal(discovery.scoreResource(resource, 'art'), null);
});

test('getResourceDetails normalizes legacy resources', () => {
  const resource = discovery.getResourceDetails([{ id: 7, name: 'Legacy', link: '' }], '7');
  assert.equal(resource.name, 'Legacy');
  assert.deepEqual(resource.discovery.capabilities, []);
  assert.equal(resource.discovery.verification_status, 'Unverified');
});

test('DB-backed service exposes MCP-ready signatures', async () => {
  const service = createDiscoveryService(() => Promise.resolve(resources));
  const found = await service.searchResources('Find skills for startup planning.', { limit: 1 });
  const detail = await service.getResourceDetails(1);
  const task = await service.findResourcesForTask('Find skills for startup planning.', { limit: 1 });

  assert.equal(found[0].name, 'founder');
  assert.equal(detail.id, 1);
  assert.equal(task.results[0].name, 'founder');
});
