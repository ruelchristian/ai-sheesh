# AI-Sheesh Library: Category Rankings, Overlap Resolution & Selection Rationale

This document catalogs, audits, and ranks all **89 tools and skills** in the `ai-sheesh` library under the **Dual-Verification Model** (audited against **NVIDIA SkillSpector** standards):
* **✅ 84 Tools Verified for Everyday Engineering**: 100% clean, zero-injection, zero-credential-leak tools approved for autonomous coding runs in production pipelines.
* **🎯 5 Tools Verified for Authorized Pentesting**: Legitimate, verified offensive security and penetration testing tools for authorized red-teaming and VAPT assessments in isolated sandboxes.

---

## 1. Category-by-Category Rankings & Overlap Resolution

---

### Category A: Coding Workflow & Architecture (33 Tools)

This category governs planning, diff creation, code style, architecture mapping, database design, and PR delivery.

| Rank | Tool / Skill | Audit Status | Primary Focus | Best Used For |
|:---:|---|:---:|---|---|
| **1** | **gstack** | ✅ Verified | Multi-Role Orchestration | **The entire factory backbone**: CEO framing (`office-hours`), multi-angle planning, browser QA, and shipping. |
| **2** | **Karpathy skills** | ✅ Verified | Code Philosophy | **Default mindset**: Forces minimal abstractions, flat files, and zero speculative over-engineering. |
| **3** | **ponytail** | ✅ Verified | Diff Generation | **Surgical changes**: Restricts diffs to the absolute minimum lines; forbids drive-by refactorings. |
| **4** | **Matt Pocock skills** | ✅ Verified | Requirements Interrogation | **Spec discovery**: Runs `/grill-me` before coding when requirements are vague; enforces strict TypeScript. |
| **5** | **elephant-goldfish-model** | ✅ Verified | Spec & Unbiased Review | **Google's spec review paradigm**: Drafting agent with deep memory ("Elephant") paired with a cold, context-free reviewer ("Goldfish") to eliminate confirmation bias. |
| **6** | **database-architect** | ✅ Verified | Senior DBA & Schema Design | **Zero-downtime database architecture**: Safe online migrations (`CREATE INDEX CONCURRENTLY`, `lock_timeout = '2s'`), composite FKs for multi-tenant RLS, and scratch Postgres test proof. |
| **7** | **code-reviewer** | ✅ Verified | Forensic Diff Bug Hunter | **Pre-merge bug hunting**: Reads beyond hunks to check all external callers, hunts subtle language gotchas (TS, Python, Go, SQL), and strictly requires a concrete failure scenario before reporting. |
| **8** | **ultra-think** | ✅ Verified | Multi-Framework Deep Reasoning | **Pre-flight reasoning**: Multi-framework structured analysis surfacing hidden assumptions, trade-offs, and competing solutions before coding. |
| **9** | **generate-tests** | ✅ Verified | Automated Test Generator | **Comprehensive test suites**: Crafts unit, edge-case, and boundary test files matching repo conventions (Jest, Vitest, Pytest, Go). |
| **10** | **run-tests-after-changes** | ✅ Verified | Post-Tool TDD Regression Hook | **Immediate TDD feedback**: Silently executes fast unit tests immediately after file modifications to catch regressions in the same turn. |
| **11** | **superpowers** | ✅ Verified | TDD & Isolation | **Code safety**: Enforces writing failing tests first + working in isolated `git worktree`s. |
| **12** | **tstack** | ✅ Verified | PR Automation & Review | **Autonomous delivery**: Multi-model consensus review (`council`), hands-off PR shipping (`full-send`), CI babysitting. |
| **13** | **modern-web-guidance** | ✅ Verified | Web Standards & Best Practices | **Google Chrome official guidance**: Injects modern web platform APIs, browser compatibility, and performance patterns directly into coding agents. |
| **14** | **Floorplan** | ✅ Verified | Codebase Map | **Navigation**: Live, interactive, plain-English architectural map of files, routes, and connections. |
| **15** | **bulletproof-react** | ✅ Verified | Scalable Frontend Blueprint | **React architecture**: Production-ready folder structure, feature-based modularity, state management, and testing patterns. |
| **16** | **breakscale** | ✅ Verified | Architecture Stress-Testing | **System design**: Simulates synthetic load, queues, and retry storms to find bottlenecks before coding. |
| **17** | **system-design-primer** | ✅ Verified | Distributed Systems Roadmap | **Scalability knowledge**: Definitive architectural patterns for caching, replication, sharding, and consensus algorithms. |
| **18** | **safe-dev-permissions** | ✅ Verified | Streamlined Execution Profile | **Frictionless workflow**: Pre-authorizes safe routine commands (test, lint, build, git diff, git status) to eliminate repetitive permission prompts. |
| **19** | **founder** | ✅ Verified | Business Strategy | **Pre-code validation**: Tests business models, unit economics, and customer personas before building. |
| **20** | **system-design-notes** | ✅ Verified | Architecture Quick Reference | **Concise blueprints**: Trade-offs, high-level diagrams, and scaling numbers for rate limiters, KV stores, and chat backends. |
| **21** | **devops-engineer** | ✅ Verified | CI/CD & Cloud Infrastructure | **Deployment automation**: Production GitHub Actions CI/CD pipelines, multi-arch Docker packaging, blue-green deployment scripts, Terraform IaC, and Prometheus alerting. |
| **22** | **dotnet-skills** | ✅ Verified | C# / .NET Conventions | **Microsoft official skills**: Clean architecture, Roslyn analyzers, dependency injection, and EF Core patterns for .NET. |
| **23** | **caveman** | ✅ Verified | Latency & Token Economy | **Speed & cost**: Drops filler words and conversational fluff to make agent replies faster. |
| **24** | **Claude Code best practice** | ✅ Verified | Reference Patterns | Authoritative patterns for subagents, workflows, and hooks. |
| **25** | **Anthropic skills** | ✅ Verified | Official Reference | Official patterns for API design and document generation. |
| **26** | **aspnetboilerplate** | ✅ Verified | Enterprise Backend Boilerplate | Enterprise DDD (Domain Driven Design), multi-tenancy, and modular application framework for ASP.NET Core. |
| **27** | **Orca (stablyai)** | ✅ Verified | Fleet Execution | Runs fleets of coding agents in parallel across separate worktrees (heavy orchestration). |
| **28** | **openhuman** | ✅ Verified | Lightweight Agent Fleet Harness | High-efficiency agent harness designed to run fleets of 500+ parallel autonomous agents with minimal memory footprint. |
| **29** | **agentic-awesome-skills** | ✅ Verified | Meta Skill Catalog | Massive collection of 3,000+ curated and categorized reusable agent skills across specialized frameworks and languages. |
| **30** | **Find Skills (Vercel Labs)**| ✅ Verified | Meta-Installer | `npx skills find` utility to search and install missing skills on demand. |
| **31** | **ai-engineering-from-scratch**| ✅ Verified | AI Architecture Reference | Zero-dependency implementation of LLMs, fine-tuning, RAG, and agent runtimes from first principles. |
| **32** | **wshobson/agents** | ✅ Verified | Persona Catalog | Large catalog of specialized personas when you need an uncommon specialist. |
| **33** | **AITMPL** | ✅ Verified | CLI Registry | Template browser for downloading Claude Code templates and commands. |

#### Overlap Resolution in Coding Workflow:
- **`gstack` vs. `tstack`**: `gstack` acts as your **internal engineering department** (CEO, Eng Manager, Browser QA). `tstack` acts as your **shipping pipeline** (`council` for multi-model consensus, `full-send` for hands-off PR creation). Combine them: Plan and QA with `gstack`; review and ship PRs with `tstack`.
- **`code-reviewer` vs. `council` vs. `gstack (review)`**:
  - `gstack review`: Emulates a high-level Engineering Manager asking architecture questions.
  - `council`: Polls multiple external LLMs (Claude + Gemini + ChatGPT) for consensus.
  - `code-reviewer`: An **active AST and diff investigator**: reads beyond the hunks, greps for external callers, tests failure scenarios, and drops fluff/style comments.
- **`ultra-think` vs. `ponytail` / `Karpathy skills`**:
  - `ultra-think` is **pre-flight divergence**: rigorously explores alternative architectures, unstated assumptions, and edge cases before writing a line of code.
  - `ponytail` and `Karpathy skills` enforce **strict convergence during execution**: minimalist diffs, zero speculative abstractions, and lean implementations once code writing begins.
- **`generate-tests` vs. `run-tests-after-changes` vs. `superpowers`**:
  - `superpowers` dictates **TDD workflow discipline** (write failing test first, run in worktree).
  - `generate-tests` **authors comprehensive test files** (unit, boundary, edge cases conforming to Jest/Vitest/Pytest).
  - `run-tests-after-changes` is the **real-time execution hook** that silently triggers fast unit tests immediately upon file changes.
- **`elephant-goldfish-model` vs. `Matt Pocock (/grill-me)`**:
  - `Matt Pocock (/grill-me)` is an **interactive human-agent interview**: the agent grills *you* to flesh out requirements before writing any code.
  - `elephant-goldfish-model` is an **agent-agent review protocol**: the Elephant agent synthesizes deep historical context to write the spec, while the Goldfish agent reviews the spec with zero conversational memory to flag hidden assumptions and logical gaps without sycophancy or bias.

---

### Category B: Design & UI (13 Tools)

This category covers UI styling, de-slopping, design systems, and frontend animations.

| Rank | Tool / Skill | Audit Status | Primary Focus | Best Used For |
|:---:|---|:---:|---|---|
| **1** | **unslop** | ✅ Verified | Active De-Slop Pass | **Eliminating AI UI**: Automatically redlines and removes purple gradients, emoji clutter, and AI boilerplate. |
| **2** | **Impeccable** | ✅ Verified | Design Vocabulary & Audit | **Layout discipline**: Audits typography scale, strict 8px spacing grid, and WCAG AA contrast. |
| **3** | **Stageshow** | ✅ Verified | Product UI & Bento Cards | **Hero visuals**: Benji Taylor's kit for realistic faux product UIs, bento grids, and cursor demo animations. |
| **4** | **21st.dev** | ✅ Verified | Component Registry | **Copy-paste UI**: Direct library of production-tested React + Tailwind / shadcn components. |
| **5** | **astryx** | ✅ Verified | Enterprise Design System | **Meta's design system**: Accessible primitives, design tokens, and agent-ready UI components for building consistent enterprise frontends. |
| **6** | **Emil Kowalski motion** | ✅ Verified | Motion Design Rules | **Micro-interactions**: Spring physics, damping ratios, and layout-shift prevention guidelines. |
| **7** | **anti-slop** | ✅ Verified | Style & Copy Rules | **Static rulebook**: Prevents agents from producing cliché copy and robotic UI. |
| **8** | **taste-skill** | ✅ Verified | Art Direction | **Distinctiveness**: Gives coding agents art direction rules, real photography checks, and visual taste. |
| **9** | **ui-ux pro max** | ✅ Verified | Design Reference Database | Quick pre-flight decisions on palettes, font pairings, and framework guidelines. |
| **10** | **Framer Motion (Motion)** | ✅ Verified | Animation Library | The standard declarative React animation package (springs, gestures, transitions). |
| **11** | **css-reels** | ✅ Verified | Pure CSS Micro-Interactions | Curated collection of pure CSS animations, visual effects, and UI components without heavy JS dependencies. |
| **12** | **pixelfx** | ✅ Verified | Game & Retro VFX | 244 procedural pixel art animations and combat VFX in pure code for canvas/games. |
| **13** | **page-mascot** | ✅ Verified | Playful Widget | Interactive cursor-following sprite for landing page touches. |

---

### Category C: Agent Tools, Memory & Research (12 Tools)

This category ensures agents remember context, reduce token consumption, optimize prompts, and research external knowledge.

| Rank | Tool / Skill | Audit Status | Primary Focus | Best Used For |
|:---:|---|:---:|---|---|
| **1** | **Claude-mem** | ✅ Verified | Session Memory Bank | **Stopping amnesia**: Captures what the agent does, compresses it, and injects context into future sessions. |
| **2** | **context7** | ✅ Verified | Live Official Documentation MCP | **Zero API hallucinations**: Upstash Context7 MCP server dynamically fetching version-specific official documentation (Next.js 15, Tailwind v4, Drizzle) directly into prompts. |
| **3** | **headroom** | ✅ Verified | Token Compression Layer | **Context optimization**: Compresses large logs, terminal output, and files locally before the LLM reads them. |
| **4** | **graphify** | ✅ Verified | Code Knowledge Graph | **Large codebase navigation**: AST-based deterministic knowledge graph to query relationships without vector search. |
| **5** | **prompt-engineer** | ✅ Verified | Meta-Prompt Optimization | **Universal prompt architect**: Designs, optimizes, and token-compresses prompts across Claude, OpenAI/Codex, and Gemini models with XML encapsulation and few-shot examples. |
| **6** | **context-monitor** | ✅ Verified | Real-Time Statusline Gauge | **Context exhaustion prevention**: Displays visual token progress bars, color-coded alerts, and auto-compact warnings in terminal statuslines. |
| **7** | **postgresql-mcp** | ✅ Verified | Live Database Introspection MCP | **Schema & data verification**: Model Context Protocol server providing read-only SQL queries, table schema introspection, and foreign key inspection. |
| **8** | **simple-notifications** | ✅ Verified | Desktop OS Alert Hook | **Unattended workflows**: Fires native desktop audio and banner notifications (`notify-send` / `osascript`) when long-running agent tasks complete or request input. |
| **9** | **Agent-Reach** | ✅ Verified | Web & Social Research | **Free external data**: Lets agents read/search GitHub, X, Reddit, and YouTube without paid API keys. |
| **10** | **zabbix-mcp-server** | ✅ Verified | Enterprise Infra Telemetry | **Production monitoring**: MCP server exposing 237 tools for real-time infrastructure metrics, host alarms, and automated incident triage. |
| **11** | **rea** | ✅ Verified | Reverse-Engineering Framework | **Binary & protocol inspection**: Disassembles and analyzes software behavior from opaque network APIs down to compiled binaries. |
| **12** | **Hindsight** | ✅ Verified | Reflection Architecture | Bi-directional memory loop reviewing past runs to self-correct repeating agent errors. |

#### Overlap Resolution in Agent Tools & Memory:
- **`context7` vs. `Agent-Reach`**: `Agent-Reach` is an open-ended researcher exploring community forums, GitHub issues, and social platforms; `context7` directly queries canonical, version-pinned documentation (Next.js 15, Tailwind v4, Drizzle) straight from official sources into prompt context, eliminating API hallucinations.
- **`context-monitor` vs. `headroom`**: `headroom` is an active data compressor that shrinks terminal outputs and logs before LLM ingestion; `context-monitor` provides ambient terminal statusline visibility and auto-compact threshold alerts.

---

### Category D: Docs, Media & Video Generation (16 Tools)

This category covers programmatic media, video editing, sound design, diagrams, and document processing.

| Rank | Tool / Skill | Audit Status | Primary Focus | Best Used For |
|:---:|---|:---:|---|---|
| **1** | **stack diagram** | ✅ Verified | Architecture Diagrams | **Essential documentation**: Generates clean architecture diagrams with official logos from 1 sentence. |
| **2** | **Remocn** | ✅ Verified | Programmatic Video | **Feature releases & changelogs**: 900+ Remotion components to generate video demos straight from code. |
| **3** | **real sfx** | ✅ Verified | Video Sound Design | **Audio placement**: Places real recorded sound effects on exact video frames while preserving voice/music. |
| **4** | **VibeVoice** | ✅ Verified | Frontier Voice AI | **High-fidelity synthetic audio**: Microsoft open-source expressive, low-latency conversational speech synthesis for video narration and agents. |
| **5** | **earshot** | ✅ Verified | Sound FX Engine | **Procedural audio**: CPU-only sound generation engine (922 sound designs) and audio verification for agents. |
| **6** | **motionmaxxing** | ✅ Verified | Kinetic Typography | **Launch teasers**: Turns AI video slop into high-tempo, kinetic typography launch films. |
| **7** | **i hate editing** | ✅ Verified | Social Reel Editing | **Founder videos**: Takes raw talking-head takes and auto-cuts silences, captions, and zoom cards. |
| **8** | **reverse-engineer-marketing** | ✅ Verified | Marketing & Funnel Intelligence | **Competitor reverse-engineering**: Deep-dive marketing analysis of any URL (paid ads, SEO, social, tech stack, and funnel steps). |
| **9** | **Openverse** | ✅ Verified | Royalty-Free Media Search | **Legal stock assets**: Search engine and API for 700M+ CC0 and public-domain images and audio. |
| **10** | **ppt-master** | ✅ Verified | Presentation Decks | **Pitch decks**: Generates real, editable vector `.pptx` PowerPoint decks with speaker notes. |
| **11** | **Unlimited OCR** | ✅ Verified | Local Document Parsing | **Digitization**: Runs local vision models to convert PDFs and scans into Markdown without API limits. |
| **12** | **Teardown** | ✅ Verified | 3D Interactive Simulators | **Explainer widgets**: Turns machines or physical mechanisms into 3D HTML simulators you can take apart. |
| **13** | **rea-video** | ✅ Verified | Video Forensics | **Reverse-engineering**: Dissects reference videos shot-by-shot to extract pacing, camera moves, and recreation prompts. |
| **14** | **make-an-anime** | ✅ Verified | Story-to-Anime Pipeline | Automated pipeline directing anime production (character sheets, storyboards, voice lines). |
| **15** | **animated shorts** | ✅ Verified | Cartoon Story Shorts | Three.js + Remotion pipeline making vertical 2D/3D cartoon story shorts locally. |
| **16** | **page-mascot** | ✅ Verified | Interactive Sprite | Lightweight cursor-tracking mascot character for landing pages. |

---

### Category E: Security & Guardrails (13 Tools)

This category covers runtime boundaries, AI code audits, defensive static analysis, and authorized penetration testing.

| Rank | Tool / Skill | Audit Status | Primary Focus | Best Used For |
|:---:|---|:---:|---|---|
| **1** | **cc-safety-net** | ✅ Verified | Pre-Execution Guardrail | **Essential protection**: Pre-execution hook blocking `rm -rf`, force pushes, and secret exposure before commands run. |
| **2** | **SkillSpector** | ✅ Verified | Agent Skill Supply-Chain Audit | **NVIDIA skill scanner**: Audits third-party agent skills and MCP tools for prompt injections, malicious scripts, credential harvesting, and dangerous permissions before install. |
| **3** | **vbsec** | ✅ Verified | AI Code Vulnerability Audit | **Vibe-code check**: Scans newly generated code for SQL injection, missing auth checks, and hardcoded keys. |
| **4** | **Defending Code** | ✅ Verified | Reference Pipeline | Anthropic's reference security architecture for threat modeling, triage, and patch generation. |
| **5** | **Security Audit** | ✅ Verified | Pre-Release Audit | Audits repository configs, dependency supply-chain risks, and prompt injection vectors. |
| **6** | **AgentGuard** | ✅ Verified | Zero-Trust Runtime Monitor | Monitors and enforces granular policy restrictions on agent file and tool execution. |
| **7** | **Trail of Bits Skills** | ✅ Verified | Deep Code Analysis | Specialized engineering skills: Semgrep rules, CodeQL, variant analysis, and smart contracts. |
| **8** | **OWASP Agentic Skills Top 10** | ✅ Verified | Risk Evaluation | Assesses whether your agent workflows comply with the OWASP Top 10 Agentic Risks. |
| **9** | **Claude Cybersecurity** | ✅ Verified | Security Mapping | Plugin mapping 18+ enterprise security domains to NIST and MITRE ATT&CK frameworks. |
| **10** | **HexSTRIKE** | 🎯 Verified (Pentest) | Offensive MCP Framework | Comprehensive MCP server orchestrating 150+ pentesting tools for authorized penetration testing and vulnerability research. |
| **11** | **PentestingEverything** | 🎯 Verified (Pentest) | VAPT / AppSec Methodology | Complete checklist and methodology reference covering Web, Mobile, API, and Thick Client attack vectors. |
| **12** | **Ghost Security** | 🎯 Verified (Pentest) | Web & API Traffic Proxy | Intercepts, inspects, and validates web application and API traffic (Reaper proxy). |
| **13** | **Bug Hunter** / **Claude-Red**| 🎯 Verified (Pentest) | Red-Team Pentesting | Offensive skills guiding agents through attack-surface discovery and exploit verification in controlled environments. |

#### Operational Boundaries for Security Tools:
* **Everyday Engineering (`cc-safety-net`, `SkillSpector`, `vbsec`)**:
  - Always active in the autonomous software factory loop to ensure machine integrity, dependency safety, and code quality.
* **Authorized Pentesting Tools (`HexSTRIKE`, `Claude-Red`, `PentestingEverything`, `Ghost Security`, `Bug Hunter`)**:
  - Verified as legitimate security testing tools.
  - Tagged `#Verified-Pentest` and quarantined from autonomous feature building loops; invoked specifically for authorized red-team engagements and security assessments in dedicated sandboxes.

---

### Category F: Standalone Reference Apps (2 Tools)

| Rank | Tool | Audit Status | Category in Library | Description |
|:---:|---|:---:|---|---|
| **1** | **clearcam** | ✅ Verified | Apps | Open-source intelligent computer vision system: adds local object detection, tracking, visual search, and alerts to any security camera. |
| **2** | **Wardrobe** | ✅ Verified | Apps | Self-hosted closet and laundry management web app (included as an end-to-end reference app). |
