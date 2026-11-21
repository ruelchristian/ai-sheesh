# AI-Sheesh Library: Category Rankings, Overlap Resolution & Selection Rationale

This document catalogs and ranks all **77 tools and skills** in the `ai-sheesh` library, resolves functional overlaps between them, and documents the architectural rationale for selecting the core engine of the **Software Factory**.

---

## 1. Category-by-Category Rankings & Overlap Resolution

---

### Category A: Coding Workflow & Architecture (26 Tools)

This category governs planning, diff creation, code style, architecture mapping, and PR delivery.

| Rank | Tool / Skill | Primary Focus | Best Used For |
|:---:|---|---|---|
| **1** | **gstack** | Multi-Role Orchestration | **The entire factory backbone**: CEO framing (`office-hours`), multi-angle planning, browser QA, and shipping. |
| **2** | **Karpathy skills** | Code Philosophy | **Default mindset**: Forces minimal abstractions, flat files, and zero speculative over-engineering. |
| **3** | **ponytail** | Diff Generation | **Surgical changes**: Restricts diffs to the absolute minimum lines; forbids drive-by refactorings. |
| **4** | **Matt Pocock skills** | Requirements Interrogation | **Spec discovery**: Runs `/grill-me` before coding when requirements are vague; enforces strict TypeScript. |
| **5** | **elephant-goldfish-model** | Spec & Unbiased Review | **Google's spec review paradigm**: Drafting agent with deep memory ("Elephant") paired with a cold, context-free reviewer ("Goldfish") to eliminate confirmation bias. |
| **6** | **superpowers** | TDD & Isolation | **Code safety**: Enforces writing failing tests first + working in isolated `git worktree`s. |
| **7** | **tstack** | PR Automation & Review | **Autonomous delivery**: Multi-model consensus review (`council`), hands-off PR shipping (`full-send`), CI babysitting. |
| **8** | **modern-web-guidance** | Web Standards & Best Practices | **Google Chrome official guidance**: Injects modern web platform APIs, browser compatibility, and performance patterns directly into coding agents. |
| **9** | **Floorplan** | Codebase Map | **Navigation**: Live, interactive, plain-English architectural map of files, routes, and connections. |
| **10** | **bulletproof-react** | Scalable Frontend Blueprint | **React architecture**: Production-ready folder structure, feature-based modularity, state management, and testing patterns. |
| **11** | **breakscale** | Architecture Stress-Testing | **System design**: Simulates synthetic load, queues, and retry storms to find bottlenecks before coding. |
| **12** | **system-design-primer** | Distributed Systems Roadmap | **Scalability knowledge**: Definitive architectural patterns for caching, replication, sharding, and consensus algorithms. |
| **13** | **founder** | Business Strategy | **Pre-code validation**: Tests business models, unit economics, and customer personas before building. |
| **14** | **system-design-notes** | Architecture Quick Reference | **Concise blueprints**: Trade-offs, high-level diagrams, and scaling numbers for rate limiters, KV stores, and chat backends. |
| **15** | **dotnet-skills** | C# / .NET Conventions | **Microsoft official skills**: Clean architecture, Roslyn analyzers, dependency injection, and EF Core patterns for .NET. |
| **16** | **caveman** | Latency & Token Economy | **Speed & cost**: Drops filler words and conversational fluff to make agent replies faster. |
| **17** | **Claude Code best practice** | Reference Patterns | Authoritative patterns for subagents, workflows, and hooks. |
| **18** | **Anthropic skills** | Official Reference | Official patterns for API design and document generation. |
| **19** | **aspnetboilerplate** | Enterprise Backend Boilerplate | Enterprise DDD (Domain Driven Design), multi-tenancy, and modular application framework for ASP.NET Core. |
| **20** | **Orca (stablyai)** | Fleet Execution | Runs fleets of coding agents in parallel across separate worktrees (heavy orchestration). |
| **21** | **openhuman** | Lightweight Agent Fleet Harness | High-efficiency agent harness designed to run fleets of 500+ parallel autonomous agents with minimal memory footprint. |
| **22** | **agentic-awesome-skills** | Meta Skill Catalog | Massive collection of 3,000+ curated and categorized reusable agent skills across specialized frameworks and languages. |
| **23** | **Find Skills (Vercel Labs)**| Meta-Installer | `npx skills find` utility to search and install missing skills on demand. |
| **24** | **ai-engineering-from-scratch**| AI Architecture Reference | Zero-dependency implementation of LLMs, fine-tuning, RAG, and agent runtimes from first principles. |
| **25** | **wshobson/agents** | Persona Catalog | Large catalog of specialized personas when you need an uncommon specialist. |
| **26** | **AITMPL** | CLI Registry | Template browser for downloading Claude Code templates and commands. |

#### Overlap Resolution in Coding Workflow:
- **`gstack` vs. `tstack`**: `gstack` acts as your **internal engineering department** (CEO, Eng Manager, Browser QA). `tstack` acts as your **shipping pipeline** (`council` for multi-model consensus, `full-send` for hands-off PR creation). Combine them: Plan and QA with `gstack`; review and ship PRs with `tstack`.
- **`elephant-goldfish-model` vs. `Matt Pocock (/grill-me)`**:
  - `Matt Pocock (/grill-me)` is an **interactive human-agent interview**: the agent grills *you* to flesh out requirements before writing any code.
  - `elephant-goldfish-model` is an **agent-agent review protocol**: the Elephant agent synthesizes deep historical context to write the spec, while the Goldfish agent reviews the spec with zero conversational memory to flag hidden assumptions and logical gaps without sycophancy or bias.
- **`Karpathy` vs. `ponytail`**: `Karpathy` dictates *what* code to write (simple, direct, flat). `ponytail` dictates *how the diff looks* (minimal lines, no reformatting, reuse existing helpers).
- **`superpowers` vs. `modern-web-guidance`**: `superpowers` enforces the TDD discipline (failing test first, isolated worktree). `modern-web-guidance` provides the exact domain standards for *how* web APIs (CSS container queries, Web Workers, fetch streaming) must be implemented.

---

### Category B: Design & UI (13 Tools)

This category covers UI styling, de-slopping, design systems, and frontend animations.

| Rank | Tool / Skill | Primary Focus | Best Used For |
|:---:|---|---|---|
| **1** | **unslop** | Active De-Slop Pass | **Eliminating AI UI**: Automatically redlines and removes purple gradients, emoji clutter, and AI boilerplate. |
| **2** | **Impeccable** | Design Vocabulary & Audit | **Layout discipline**: Audits typography scale, strict 8px spacing grid, and WCAG AA contrast. |
| **3** | **Stageshow** | Product UI & Bento Cards | **Hero visuals**: Benji Taylor's kit for realistic faux product UIs, bento grids, and cursor demo animations. |
| **4** | **21st.dev** | Component Registry | **Copy-paste UI**: Direct library of production-tested React + Tailwind / shadcn components. |
| **5** | **astryx** | Enterprise Design System | **Meta's design system**: Accessible primitives, design tokens, and agent-ready UI components for building consistent enterprise frontends. |
| **6** | **Emil Kowalski motion** | Motion Design Rules | **Micro-interactions**: Spring physics, damping ratios, and layout-shift prevention guidelines. |
| **7** | **anti-slop** | Style & Copy Rules | **Static rulebook**: Prevents agents from producing cliché copy and robotic UI. |
| **8** | **taste-skill** | Art Direction | **Distinctiveness**: Gives coding agents art direction rules, real photography checks, and visual taste. |
| **9** | **ui-ux pro max** | Design Reference Database | Quick pre-flight decisions on palettes, font pairings, and framework guidelines. |
| **10** | **Framer Motion (Motion)** | Animation Library | The standard declarative React animation package (springs, gestures, transitions). |
| **11** | **css-reels** | Pure CSS Micro-Interactions | Curated collection of pure CSS animations, visual effects, and UI components without heavy JS dependencies. |
| **12** | **pixelfx** | Game & Retro VFX | 244 procedural pixel art animations and combat VFX in pure code for canvas/games. |
| **13** | **page-mascot** | Playful Widget | Interactive cursor-following sprite for landing page touches. |

#### Overlap Resolution in Design & UI:
- **`unslop` vs. `anti-slop`**: `anti-slop` is a passive text rulebook. `unslop` is an **active multi-pass critique engine** with visual reference comparisons that audits and rewrites dirty code. `unslop` supersedes `anti-slop`.
- **`unslop` vs. `Impeccable` vs. `taste-skill`**:
  - Use `taste-skill` *before* coding to pick art direction and palettes.
  - Use `Impeccable` to ensure the mathematical layout (8px grid, typographic hierarchy) is sound.
  - Use `unslop` as the final pass to strip out AI-generated clichés and purple glows.
- **`Stageshow` vs. `21st.dev` vs. `astryx`**:
  - `astryx` provides **accessible design tokens and foundation primitives** (Meta standard).
  - `21st.dev` provides **functional copy-paste UI components** (shadcn/Tailwind forms, dialogs, navbars).
  - `Stageshow` provides **marketing illustrations and product teasers** (bento cards, simulated cursor demos).

---

### Category C: Agent Tools, Memory & Research (7 Tools)

This category ensures agents remember context, reduce token consumption, and research external knowledge.

| Rank | Tool / Skill | Primary Focus | Best Used For |
|:---:|---|---|---|
| **1** | **Claude-mem** | Session Memory Bank | **Stopping amnesia**: Captures what the agent does, compresses it, and injects context into future sessions. |
| **2** | **headroom** | Token Compression Layer | **Context optimization**: Compresses large logs, terminal output, and files locally before the LLM reads them. |
| **3** | **graphify** | Code Knowledge Graph | **Large codebase navigation**: AST-based deterministic knowledge graph to query relationships without vector search. |
| **4** | **Agent-Reach** | Web & Social Research | **Free external data**: Lets agents read/search GitHub, X, Reddit, and YouTube without paid API keys. |
| **5** | **zabbix-mcp-server** | Enterprise Infra Telemetry | **Production monitoring**: MCP server exposing 237 tools for real-time infrastructure metrics, host alarms, and automated incident triage. |
| **6** | **rea** | Reverse-Engineering Framework | **Binary & protocol inspection**: Disassembles and analyzes software behavior from opaque network APIs down to compiled binaries. |
| **7** | **Hindsight** | Reflection Architecture | Bi-directional memory loop reviewing past runs to self-correct repeating agent errors. |

#### Overlap Resolution in Memory & Context:
- **`Claude-mem` vs. `Hindsight` vs. `graphify`**:
  - `Claude-mem` stores **historical human-agent session context and decisions** (what we did yesterday).
  - `graphify` maps the **static code architecture** (how function A connects to file B via AST).
  - `Hindsight` analyzes **execution failures** (why an agent failed a test 3 runs ago).

---

### Category D: Docs, Media & Video Generation (16 Tools)

This category covers programmatic media, video editing, sound design, diagrams, and document processing.

| Rank | Tool / Skill | Primary Focus | Best Used For |
|:---:|---|---|---|
| **1** | **stack diagram** | Architecture Diagrams | **Essential documentation**: Generates clean architecture diagrams with official logos from 1 sentence. |
| **2** | **Remocn** | Programmatic Video | **Feature releases & changelogs**: 900+ Remotion components to generate video demos straight from code. |
| **3** | **real sfx** | Video Sound Design | **Audio placement**: Places real recorded sound effects on exact video frames while preserving voice/music. |
| **4** | **VibeVoice** | Frontier Voice AI | **High-fidelity synthetic audio**: Microsoft open-source expressive, low-latency conversational speech synthesis for video narration and agents. |
| **5** | **earshot** | Sound FX Engine | **Procedural audio**: CPU-only sound generation engine (922 sound designs) and audio verification for agents. |
| **6** | **motionmaxxing** | Kinetic Typography | **Launch teasers**: Turns AI video slop into high-tempo, kinetic typography launch films. |
| **7** | **i hate editing** | Social Reel Editing | **Founder videos**: Takes raw talking-head takes and auto-cuts silences, captions, and zoom cards. |
| **8** | **reverse-engineer-marketing** | Marketing & Funnel Intelligence | **Competitor reverse-engineering**: Deep-dive marketing analysis of any URL (paid ads, SEO, social, tech stack, and funnel steps). |
| **9** | **Openverse** | Royalty-Free Media Search | **Legal stock assets**: Search engine and API for 700M+ CC0 and public-domain images and audio. |
| **10** | **ppt-master** | Presentation Decks | **Pitch decks**: Generates real, editable vector `.pptx` PowerPoint decks with speaker notes. |
| **11** | **Unlimited OCR** | Local Document Parsing | **Digitization**: Runs local vision models to convert PDFs and scans into Markdown without API limits. |
| **12** | **Teardown** | 3D Interactive Simulators | **Explainer widgets**: Turns machines or physical mechanisms into 3D HTML simulators you can take apart. |
| **13** | **rea-video** | Video Forensics | **Reverse-engineering**: Dissects reference videos shot-by-shot to extract pacing, camera moves, and recreation prompts. |
| **14** | **make-an-anime** | Story-to-Anime Pipeline | Automated pipeline directing anime production (character sheets, storyboards, voice lines). |
| **15** | **animated shorts** | Cartoon Story Shorts | Three.js + Remotion pipeline making vertical 2D/3D cartoon story shorts locally. |
| **16** | **page-mascot** | Interactive Sprite | Lightweight cursor-tracking mascot character for landing pages. |

#### Overlap Resolution in Video & Audio:
- **`Remocn` vs. `motionmaxxing` vs. `animated-shorts` vs. `i-hate-editing`**:
  - `Remocn`: Code-driven **product UI walkthroughs, changelogs, and UI demos** using React components.
  - `motionmaxxing`: High-voltage **kinetic typography and motion graphic brand stings**.
  - `i-hate-editing`: Automated editing for **real human talking-head video footage**.
  - `animated-shorts`: Script-to-animation for **2D/3D cartoon storytelling**.
- **`real sfx` vs. `earshot` vs. `VibeVoice`**:
  - `real sfx` is built specifically for **video editing timelines** (places sound effects on specific video frames).
  - `earshot` generates **algorithmic UI/SFX sound effects** purely from CPU code.
  - `VibeVoice` synthesizes **human voiceover, dialogue, and natural speech**.

---

### Category E: Security & Guardrails (13 Tools)

This category covers runtime boundaries, AI code audits, defensive static analysis, and offensive testing.

| Rank | Tool / Skill | Primary Focus | Best Used For |
|:---:|---|---|---|
| **1** | **cc-safety-net** | Pre-Execution Guardrail | **Essential protection**: Pre-execution hook blocking `rm -rf`, force pushes, and secret exposure before commands run. |
| **2** | **SkillSpector** | Agent Skill Supply-Chain Audit | **NVIDIA skill scanner**: Audits third-party agent skills and MCP tools for prompt injections, malicious scripts, credential harvesting, and dangerous permissions before install. |
| **3** | **vbsec** | AI Code Vulnerability Audit | **Vibe-code check**: Scans newly generated code for SQL injection, missing auth checks, and hardcoded keys. |
| **4** | **Defending Code** | Reference Pipeline | Anthropic's reference security architecture for threat modeling, triage, and patch generation. |
| **5** | **Security Audit** | Pre-Release Audit | Audits repository configs, dependency supply-chain risks, and prompt injection vectors. |
| **6** | **AgentGuard** | Zero-Trust Runtime Monitor | Monitors and enforces granular policy restrictions on agent file and tool execution. |
| **7** | **Trail of Bits Skills** | Deep Code Analysis | Specialized engineering skills: Semgrep rules, CodeQL, variant analysis, and smart contracts. |
| **8** | **OWASP Agentic Skills Top 10** | Risk Evaluation | Assesses whether your agent workflows comply with the OWASP Top 10 Agentic Risks. |
| **9** | **Claude Cybersecurity** | Security Mapping | Plugin mapping 18+ enterprise security domains to NIST and MITRE ATT&CK frameworks. |
| **10** | **HexSTRIKE** | Offensive MCP Framework | Comprehensive MCP server orchestrating 150+ pentesting tools for authorized security research. |
| **11** | **PentestingEverything** | VAPT / AppSec Methodology | Complete checklist and methodology reference covering Web, Mobile, API, and Thick Client attack vectors. |
| **12** | **Ghost Security** | Web & API Traffic Proxy | Intercepts, inspects, and validates web application and API traffic (Reaper proxy). |
| **13** | **Bug Hunter** / **Claude-Red**| Red-Team Pentesting | Offensive skills guiding agents through attack-surface discovery and exploit verification. |

#### Overlap Resolution in Security:
- **`cc-safety-net` vs. `SkillSpector` vs. `AgentGuard`**:
  - `SkillSpector` acts at **installation time**: It scans incoming community skills, MCP tools, and YAML/JSON configs for Trojan horses, malicious bash snippets, and prompt injection *before* you install them.
  - `cc-safety-net` acts at **command execution time**: It intercepts raw bash execution to immediately abort accidental disasters (like deleting the repo or exposing `.env`).
  - `AgentGuard` acts at **runtime boundary**: It enforces zero-trust filesystem and network policies while agents are actively executing.
- **Defensive (`cc-safety-net`, `SkillSpector`, `vbsec`) vs. Offensive (`HexSTRIKE`, `Claude-Red`, `PentestingEverything`)**:
  - Every software factory project requires **defensive guardrails** to safeguard machine integrity and code quality.
  - Offensive tools should **only** be activated during authorized vulnerability assessments, red teaming, or penetration testing sprints.

---

### Category F: Standalone Reference Apps (2 Tools)

| Rank | Tool | Category in Library | Description |
|:---:|---|---|---|
| **1** | **clearcam** | Apps | Open-source intelligent computer vision system: adds local object detection, tracking, visual search, and alerts to any security camera. |
| **2** | **Wardrobe** | Apps | Self-hosted closet and laundry management web app (included as an end-to-end reference app). |

---

## 2. Selection Rationale for the Software Factory Core

Why did we select **specific tools** to be the core foundation of the factory, while setting aside the rest?

### 1. The Core Problem: The 4 Fatal Agent Breakdown Points
In real-world agentic software engineering, 80% of project failures trace back to four specific breakdown points:
1. **Agent Amnesia**: The agent forgets architectural decisions, invariants, and lessons across sessions.
   - *Chosen Solution*: **`Claude-mem`** (session state) + **`docs/DECISIONS.md`** (human-readable ADR).
2. **Over-Engineering & Diff Bloat**: The agent rewrites entire files, introduces 5 layers of abstract classes, or refactors unrelated code.
   - *Chosen Solution*: **`Karpathy`** (forces flat, direct code) + **`ponytail`** (forces minimal complete diffs).
3. **Spec Ambiguity & False Assumptions**: The agent starts coding on a vague prompt and builds the wrong thing.
   - *Chosen Solution*: **`Matt Pocock (/grill-me)`** (asks clarifying questions first) + **`superpowers`** (forces a failing test first).
4. **AI UI Slop**: The agent produces tacky purple gradients, emoji clutter, and generic cards.
   - *Chosen Solution*: **`unslop`** (multi-pass de-slop review) + **`Impeccable`** (8px layout and typography discipline).

### 2. The Operational Engine: The Dual Assembly Line (`gstack` + `tstack`)
- A factory cannot be just a prompt; it requires **specialist roles** and **autonomous delivery cranes**:
  - **`gstack`** was chosen for **Internal Operations**: It gives you a CEO to rethink the product (`office-hours`), an engineering manager to review architecture, and a QA engineer that drives a real headless browser.
  - **`tstack`** was chosen for **External Delivery**: It gives you multi-model review (`council`) to verify tricky diffs across independent models, and `full-send` to package, review, and ship clean PRs.

### 3. The Compounding Engine: The Self-Improvement Loop (`self-improve`)
- Static templates decay because every human correction is forgotten the next day.
- Following **Zach Lloyd’s (Warp) Self-Improving Factory architecture**, the **`self-improve`** skill was added to create an outer feedback loop:
  - Human review feedback / corrections $\rightarrow$ Root cause diagnosis $\rightarrow$ Automatic patch to `.agents/skills/` or `docs/DECISIONS.md`.
  - The factory compounds in capability over time.

### 4. Why the Remaining Tools are Secondary / On-Demand
- Specialized generators (e.g. `make-an-anime`, `Teardown`, `pixelfx`) and offensive security suites (`HexSTRIKE`, `Bug Hunter`) are powerful in their specific domain, but keeping them loaded in the everyday core loop of a standard software project causes prompt dilution and token waste.
- They are cataloged in the library to be pulled in **on demand**, while the Core 12 tools handle 95% of routine software engineering sprints.
