'use strict';

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'about', 'anything', 'best', 'can', 'could', 'do', 'does', 'find', 'for', 'from', 'get', 'give',
  'create', 'generated', 'generating', 'helps', 'help', 'how', 'i', 'in', 'into', 'is', 'it', 'look', 'looking', 'make',
  'making', 'me', 'my', 'need', 'of', 'on', 'or', 'please', 'recommend', 'recommendation', 'recommendations', 'resource',
  'resources', 'should', 'skill', 'skills', 'some', 'someone', 'something', 'that', 'the', 'this', 'to', 'tool', 'tools',
  'top', 'using', 'used', 'want', 'what', 'which', 'who', 'where', 'would', 'with', 'you', 'your'
]);

const SYNONYMS = {
  accessible: 'accessibility',
  accessibility: 'accessibility',
  analysis: 'analyze',
  analyze: 'analyze',
  architectural: 'architecture',
  architectures: 'architecture',
  analyzed: 'analyze',
  analyzes: 'analyze',
  analyzing: 'analyze',
  animation: 'animation',
  animations: 'animation',
  animated: 'animation',
  architecture: 'architecture',
  codebase: 'codebase',
  codebases: 'codebase',
  consumption: 'token',
  usage: 'token',
  reduction: 'reduce',
  edit: 'edit',
  editor: 'edit',
  editing: 'edit',
  ffmpeg: 'ffmpeg',
  find: 'find',
  generate: 'create',
  generating: 'create',
  idea: 'idea',
  ideas: 'idea',
  memory: 'memory',
  past: 'session',
  plan: 'plan',
  planning: 'plan',
  plans: 'plan',
  previous: 'session',
  react: 'react',
  recall: 'memory',
  recalls: 'memory',
  remember: 'memory',
  remembers: 'memory',
  reduce: 'reduce',
  reduces: 'reduce',
  reducing: 'reduce',
  responsive: 'responsive',
  session: 'session',
  sessions: 'session',
  site: 'website',
  sites: 'website',
  skill: 'skill',
  skills: 'skill',
  startup: 'startup',
  startups: 'startup',
  token: 'token',
  tokens: 'token',
  video: 'video',
  videos: 'video',
  web: 'website',
  website: 'website',
  websites: 'website',
  agent: 'agent',
  agents: 'agent',
  animate: 'animation',
  animated: 'animation',
  animating: 'animation',
  audios: 'audio',
  backend: 'backend',
  codebase: 'codebase',
  contexts: 'context',
  design: 'design',
  designer: 'design',
  designing: 'design',
  diagrams: 'visualization',
  diagram: 'visualization',
  doc: 'documentation',
  docs: 'documentation',
  documentation: 'documentation',
  edited: 'edit',
  editor: 'edit',
  editing: 'edit',
  edits: 'edit',
  entrepreneur: 'startup',
  entrepreneurship: 'startup',
  founders: 'startup',
  frontend: 'frontend',
  mcp: 'mcp',
  ocr: 'ocr',
  organize: 'organization',
  organized: 'organization',
  planning: 'plan',
  plans: 'plan',
  products: 'product',
  readme: 'documentation',
  recording: 'video',
  remembered: 'memory',
  remembering: 'memory',
  recalls: 'memory',
  recalled: 'memory',
  roadmap: 'plan',
  scanning: 'security',
  scanner: 'security',
  searching: 'search',
  secure: 'security',
  securing: 'security',
  security: 'security',
  sfx: 'audio',
  sound: 'audio',
  sounds: 'audio',
  tested: 'test',
  tester: 'test',
  tests: 'test',
  testing: 'test',
  ui: 'design',
  ux: 'design',
  video: 'video',
  videos: 'video',
  visualize: 'visualization',
  visualise: 'visualization',
  vulnerabilities: 'security',
  vulnerability: 'security',
  writing: 'write',
  writer: 'write'
};

const FIELD_WEIGHTS = [
  ['capabilities', 8, 12, 'Capability'],
  ['use_when', 8, 12, 'Use case'],
  ['activation_keywords', 6, 9, 'Activation keyword'],
  ['name', 6, 8, 'Name'],
  ['resource_type', 5, 6, 'Resource type'],
  ['supported_platforms', 4, 5, 'Platform'],
  ['description', 3, 4, 'Description'],
  ['category', 3, 4, 'Category'],
  ['secondary_categories', 3, 4, 'Secondary category']
];

function list(value) {
  if (Array.isArray(value)) return value.filter((item) => typeof item === 'string' && item.trim());
  if (typeof value === 'string') return value.trim() ? [value.trim()] : [];
  return [];
}

function normalizeDiscovery(resource) {
  const source = (resource && resource.discovery) || {};
  return {
    description: typeof source.description === 'string' ? source.description : '',
    resource_type: typeof source.resource_type === 'string' ? source.resource_type : '',
    capabilities: list(source.capabilities),
    use_when: list(source.use_when),
    do_not_use_when: list(source.do_not_use_when),
    activation_keywords: list(source.activation_keywords),
    supported_platforms: list(source.supported_platforms),
    installation_instructions:
      typeof source.installation_instructions === 'string' ? source.installation_instructions : '',
    documentation_url:
      typeof source.documentation_url === 'string' ? source.documentation_url : '',
    related_resources: list(source.related_resources),
    secondary_categories: list(source.secondary_categories),
    verification_status:
      typeof source.verification_status === 'string' ? source.verification_status : 'Unverified',
    last_verified_at: typeof source.last_verified_at === 'string' ? source.last_verified_at : '',
    analysis_evidence: source.analysis_evidence && typeof source.analysis_evidence === 'object'
      ? source.analysis_evidence
      : {}
  };
}

function normalizeResource(resource) {
  return Object.assign({}, resource, { discovery: normalizeDiscovery(resource) });
}

function stem(word) {
  let value = word.toLowerCase().replace(/[^a-z0-9+#.-]/g, '').replace(/^[.-]+|[.-]+$/g, '');
  if (value.length > 4 && value.endsWith('ies')) value = `${value.slice(0, -3)}y`;
  else if (value.length > 4 && value.endsWith('sses')) value = value.slice(0, -2);
  else if (value.length > 3 && value.endsWith('s') && !value.endsWith('ss')) value = value.slice(0, -1);
  return SYNONYMS[value] || value;
}

function tokenize(value) {
  const words = String(value || '')
    .toLowerCase()
    .match(/[a-z0-9+#.-]+/g) || [];

  return [...new Set(words.map(stem).filter((word) => word.length > 1 && !STOP_WORDS.has(word)))];
}

function cleanQuery(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/^(?:hey|ok|please)\s+/, '')
    .replace(/^(?:could|would|can) you (?:please )?/, '')
    .replace(/^(?:i'd like|id like|i would like|find|show|get|give me|recommend(?: me)?|i need|i want|i'm looking for|im looking for|looking for|looking to)\s+/, '')
    .replace(/^(?:a|an|the|some|something|tool|skill|resource|resources)\s+(?:tool|skill|resource|resources)?\s*(?:for|that|to|which)?\s*/, '')
    .replace(/^(?:that|which)\s+(?:helps|can|is for)\s+/, '')
    .trim();
}

function valuesFor(resource, field) {
  if (field === 'name' || field === 'resource_type' || field === 'description') {
    return list(resource[field] || resource.discovery[field]);
  }
  return list(resource.discovery[field]);
}

function containsPhrase(value, phrase) {
  const lower = String(value || '').toLowerCase();
  const needle = String(phrase || '').toLowerCase();

  if (!needle) return false;

  let index = lower.indexOf(needle);
  while (index >= 0) {
    const before = index === 0 ? '' : lower.charAt(index - 1);
    const after = lower.charAt(index + needle.length);
    if (!/[a-z0-9]/.test(before) && !/[a-z0-9]/.test(after)) return true;
    index = lower.indexOf(needle, index + 1);
  }

  return false;
}

function phraseMatches(values, phrase, tokens) {
  return values.some((value) => {
    if (containsPhrase(value, phrase)) return true;
    const valueTokens = tokenize(value);
    return tokens.length > 0 && tokens.every((token) => valueTokens.includes(token));
  });
}

function tokenHits(values, tokens, weights) {
  const valueTokens = new Set(values.flatMap(tokenize));
  return tokens.reduce((sum, token) => {
    if (!valueTokens.has(token)) return sum;
    return sum + (weights && weights[token] ? weights[token] : 1);
  }, 0);
}

function averageWeight(tokens, weights) {
  if (!tokens.length || !weights) return 1;
  const total = tokens.reduce((sum, token) => sum + (weights[token] || 1), 0);
  return total / tokens.length;
}

function scoreResource(resource, query, weights) {
  const phrase = cleanQuery(query);
  const tokens = tokenize(phrase);

  if (!phrase || !tokens.length) return null;

  const normalized = normalizeResource(resource);
  const discovery = normalized.discovery;
  const reasons = [];
  const matchingCapabilities = [];
  const matchingUseCases = [];
  const whenToUse = [];
  const compatibilityNotes = [];
  let score = 0;
  let specificHits = 0;
  let bestValueHits = 0;

  for (const [field, tokenWeight, phraseWeight, label] of FIELD_WEIGHTS) {
    const values = valuesFor(normalized, field);
    if (!values.length) continue;

    const hits = tokenHits(values, tokens, weights);
    if (hits) score += hits * tokenWeight;
    if (phraseMatches(values, phrase, tokens)) score += phraseWeight * averageWeight(tokens, weights);

    if (field === 'capabilities' || field === 'use_when' || field === 'activation_keywords') {
      specificHits += hits;
    }

    for (const value of values) {
      const valueTokens = tokenize(value);
      const matched = tokens.some((token) => valueTokens.includes(token));
      const exact = value.toLowerCase().includes(phrase);

      if (field === 'capabilities' || field === 'use_when' || field === 'activation_keywords') {
        const valueHits = tokens.filter((token) => valueTokens.includes(token)).length;
        if (valueHits > bestValueHits) bestValueHits = valueHits;
      }

      if (!matched && !exact) continue;

      if (field === 'capabilities') {
        matchingCapabilities.push(value);
        reasons.push(`Capability: ${value}`);
      } else if (field === 'use_when') {
        matchingUseCases.push(value);
        whenToUse.push(value);
        reasons.push(`Use case: ${value}`);
      } else if (field === 'activation_keywords') reasons.push(`${label}: ${value}`);
      else if (field === 'name') reasons.push(`Name match: ${value}`);
      else if (field === 'resource_type') reasons.push(`Type: ${value}`);
      else if (field === 'supported_platforms') reasons.push(`Platform: ${value}`);
      else if (field === 'category' || field === 'secondary_categories') reasons.push(`Category: ${value}`);
      else if (field === 'description') reasons.push(`Description: ${value.slice(0, 160)}`);
    }
  }

  if (!score) return null;

  score += Math.min(specificHits, 4) * 2;
  if (bestValueHits >= 2) score += 8 + (bestValueHits - 2) * 4;

  if (discovery.do_not_use_when.length) {
    compatibilityNotes.push(...discovery.do_not_use_when.slice(0, 3).map((value) => `Not for: ${value}`));
  }
  if (discovery.supported_platforms.length) {
    compatibilityNotes.push(`Platforms: ${discovery.supported_platforms.join(', ')}`);
  }
  if (discovery.verification_status && discovery.verification_status !== 'Unverified') {
    compatibilityNotes.push(`Status: ${discovery.verification_status}`);
  }

  return Object.assign({}, normalized, {
    score,
    reasons: [...new Set(reasons)].slice(0, 6),
    matching_capabilities: [...new Set(matchingCapabilities)].slice(0, 5),
    matching_use_cases: [...new Set(matchingUseCases)].slice(0, 3),
    when_to_use: [...new Set(whenToUse.length ? whenToUse : discovery.use_when.slice(0, 1))].slice(0, 3),
    compatibility_notes: [...new Set(compatibilityNotes)].slice(0, 4)
  });
}

function searchableTokens(resource) {
  const discovery = normalizeDiscovery(resource);
  return tokenize([
    resource.name,
    resource.category,
    discovery.description,
    discovery.resource_type,
    ...discovery.capabilities,
    ...discovery.use_when,
    ...discovery.do_not_use_when,
    ...discovery.activation_keywords,
    ...discovery.supported_platforms,
    ...discovery.secondary_categories
  ].join(' '));
}

function searchResources(resources, query, options) {
  const opts = options || {};
  const limit = Number.isInteger(opts.limit) && opts.limit > 0 ? opts.limit : 20;
  const items = Array.isArray(resources) ? resources : [];
  const tokens = tokenize(cleanQuery(query));
  const frequency = new Map();

  items.forEach((resource) => {
    const present = new Set(searchableTokens(resource));
    tokens.forEach((token) => {
      if (present.has(token)) frequency.set(token, (frequency.get(token) || 0) + 1);
    });
  });

  const weights = {};
  tokens.forEach((token) => {
    const documentCount = frequency.get(token) || 0;
    weights[token] = Math.min(4, 1 + Math.log((items.length + 1) / (documentCount + 1)));
  });

  return items
    .map((resource) => scoreResource(resource, query, weights))
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .slice(0, limit);
}

function getResourceDetails(resources, id) {
  const wanted = Number(id);
  if (!Number.isInteger(wanted)) return null;

  const found = (Array.isArray(resources) ? resources : []).find((resource) => resource.id === wanted);
  return found ? normalizeResource(found) : null;
}

function findResourcesForTask(resources, taskDescription, options) {
  const task = String(taskDescription || '').trim();
  const query = cleanQuery(task);

  return {
    task,
    query: query || task,
    results: searchResources(resources, query || task, options)
  };
}

module.exports = {
  normalizeDiscovery,
  normalizeResource,
  cleanQuery,
  tokenize,
  scoreResource,
  searchResources,
  getResourceDetails,
  findResourcesForTask
};
