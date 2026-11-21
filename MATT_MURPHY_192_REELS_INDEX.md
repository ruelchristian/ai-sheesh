# Matt Murphy (@mattmurphyai) 192 Reels Master Index & Operational Field Guide

> **Source:** Archive of 192 video reels harvested from Matt Murphy (`@mattmurphyai` / The Faction Group LLC).
> **Quick Offline CLI Search:** Run `python3 scripts/search_reels.py "<keyword>"` in this repository.

## Why the Harvester Captured 192 Reels (Clarification on the '403' Profile Count)

When you view Matt Murphy's profile header on Instagram, it displays **`403 Posts`**.
- **403 Posts** is Instagram's lifetime sum of *all media formats*: photo carousel slides, text infographics, static quote cards, announcements, and video reels.
- **192 Reels** is the **exact, complete count of all video reels** published on the `/reels/` tab.
- The harvester completed successfully without stopping early: **100% of all published video reels (192/192)** were extracted.
- Crucially, **all 192 records contain the complete, written caption text** (average length: 546 characters) detailing the exact spoken lessons, checklists, and operational axioms.

## Quick Reference: 9 Core Operational Pillars

| # | Operational Pillar | Reels Count | Core Focus |
|---|---|:---:|---|
| 12 | **Vibe Coding Hardening & The 20% Production Gap** | `62` | Moving beyond initial AI prototypes; tests, linters, Stripe, error boundaries |
| 13 | **Insurance, SOC 2, Audits & Legal Liability** | `43` | Underwriting audits, board liability, recovery drills, SOC 2 controls |
| 14 | **Model Sovereignty & Local AI Infrastructure** | `32` | Keeping local weights, self-hosting, avoiding vendor lock-in and outages |
| 15 | **API Keys, Secrets & Infrastructure Failures** | `14` | Preventing GitHub leaks, webhook cascades, scoping MCP tokens |
| 16 | **Operator Mindset & Commercializing Internal Tools** | `12` | Replacing SaaS subscriptions, selling tools to strangers, workflow ROI |
| 17 | **Multi-Tenancy, Auth & Data Leaks** | `12` | Row-level security (RLS), tenant boundaries, preventing cross-customer leaks |
| 18 | **AI Security, Sandboxing & Kill Switches** | `6` | Containerizing agents, network kill switches, auto-approval guardrails |
| 19 | **Founder Bootstrapping, Client Equity & Cash Flow** | `6` | Customer-funded builds, equity-for-dev deals, avoiding the VC treadmill |
| 20 | **Shadow AI & Team Governance** | `5` | Staff using personal ChatGPT on work laptops, SEC compliance, tool policies |

---

## The 25 Definitive Matt Murphy Real-World Axioms & Protocols

### 1. [Df-gRBWTMIx] Agent Permissions
> **Axiom:** *"Size the system, not the model."*

**Action Protocol / Context:**
1. Find every setting that lets AI act without asking (auto-approve, allowed commands).
2. Run execution in a container with no credentials and no internet.
3. Give every MCP server scoped keys and log every tool call.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/Df-gRBWTMIx/)

### 3. [Df77fNrqaGJ] Model Sovereignty
> **Axiom:** *"If you do not hold the files, you do not hold the model."*

**Action Protocol / Context:**
1. Download exact model versions pinned with checksums.
2. Keep license, model card, and download date stored beside the weights.
3. Load models from your own registry backed up in a 2nd location; test with internet OFF.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/Df77fNrqaGJ/)

### 5. [Df5WpFUooIM] Vibe Coding 80/20
> **Axiom:** *"Make it prove the work: one check script for tests, types, linting and dependency scan, and nothing is done until it passes."*

**Action Protocol / Context:**
AI builds 80% of an app in one prompt. The remaining 20% (auth, billing, edge cases, error recovery) is where founders go bankrupt if they lack automated verification.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/Df5WpFUooIM/)

### 9. [DfxoWqOiQkB] Insurance & Audits
> **Axiom:** *"Proof is cheaper than premiums."*

**Action Protocol / Context:**
Underwriters do not need you to be perfect; they need you to be provable:
1. Register of every AI system, its owner, builder, and last outside review.
2. 2FA everywhere, no shared passwords, agents on scoped credentials.
3. Restored backup drill proof and immutable audit logs.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DfxoWqOiQkB/)

### 11. [DfvDeF1MJYY] Multi-Tenancy
> **Axiom:** *"Separation you have not tested is a hope."*

**Action Protocol / Context:**
1. Pick your boundary on purpose: 1 DB per customer, or shared DB with DB-enforced Row-Level Security (RLS).
2. Enforce below the app layer so the DB refuses queries even if AI forgot a filter.
3. Attack yourself with 2 automated test customer accounts on every CI/CD release.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DfvDeF1MJYY/)

### 15. [DfnVLueCk7K] Rogue Agents
> **Axiom:** *"A kill switch you have never pulled is a guess."*

**Action Protocol / Context:**
1. One switch: revoke keys, pause cron schedules, kill active tasks in a single shell command.
2. Circuit breakers: spend caps, rate limits, manual approval queue for funds & customer emails.
3. Log reversible actions; drill kill switch & rollback monthly.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DfnVLueCk7K/)

### 18. [DfiLiSKDKh9] Agent Sandboxing
> **Axiom:** *"If it can reach the internet, it is not a sandbox. It is a suggestion."*

**Action Protocol / Context:**
1. Run models and agents with outside networking OFF or strictly behind an allowlist.
2. Non-root user with read-only root filesystem, except 1 scratch directory.
3. Short-lived ephemeral tokens scoped strictly to one job.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DfiLiSKDKh9/)

### 20. [DffU5-sAbmE] Bootstrapping & Equity
> **Axiom:** *"If nobody is paying you to build it, stop building it."*

**Action Protocol / Context:**
Find a profitable customer with an urgent problem. Offer equity in exchange for funding the industry build. They get equity, NOT your IP and NOT exclusivity. You own the code and can sell to everyone else.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DffU5-sAbmE/)

### 21. [DfdB9ulIJ0H] Access Control
> **Axiom:** *"Every grant is a key. Count your keys."*

**Action Protocol / Context:**
Never click 'Allow All' on automated developer agents. Audit OAuth tokens and cloud service accounts quarterly.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DfdB9ulIJ0H/)

### 22. [DfceXrLjeer] SaaS Dependency
> **Axiom:** *"He is not installing twenty tools. He is moving in twenty new landlords."*

**Action Protocol / Context:**
The setup is free, but the rent never stops. Insurers are writing AI claims out of general liability. Build internal sovereignty instead of stacking SaaS subscriptions.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DfceXrLjeer/)

### 23. [DfZ9Tl5jgLH] Workflow ROI
> **Axiom:** *"Licenses count logins. Workflows count money."*

**Action Protocol / Context:**
Stop counting how many employees have ChatGPT logins. Rebuild one core operational workflow from the inside, verify financial output, and measure hard dollar savings.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DfZ9Tl5jgLH/)

### 24. [DfX4U16giDL] Funding Order
> **Axiom:** *"88% of venture-backed founders walk away with nothing at exit. Climb in the right order."*

**Action Protocol / Context:**
1. First, a paying customer.
2. Second, an angel investor who has actually done the job in your industry.
3. Venture Capital last (or never).

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DfX4U16giDL/)

### 25. [DfXUwKpiUNv] Operator Definition
> **Axiom:** *"An operator is a cash-flow-positive founder."*

**Action Protocol / Context:**
Before pitching investors, pull their Form ADV. Verify their fund lifecycle and check size. Real operators build sustainable cash flow rather than living bridge-round to bridge-round.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DfXUwKpiUNv/)

### 26. [DfVTlFYCeyN] Agent Ownership
> **Axiom:** *"If nobody owns the agent, the agent owns the risk."*

**Action Protocol / Context:**
Every deployed agent must have a designated human owner who reviews failure logs and signs off on operational boundaries.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DfVTlFYCeyN/)

### 27. [DfUv65LlCOo] Production Quality
> **Axiom:** *"AI writes it. A human owns it. If Cisco will not bolt AI onto its V1, why are you bolting it onto yours?"*

**Action Protocol / Context:**
Never ship unverified generated code directly to production customers. Put rigorous engineering rigor before feature velocity.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DfUv65LlCOo/)

### 28. [DfSuxA8lJbf] Self-Hosting
> **Axiom:** *"Sovereign does not mean exposed."*

**Action Protocol / Context:**
1. Private VPC network only, zero public domains mapped directly to model weights.
2. Authenticated API gateway, 1 key per application, every request logged.
3. Pinned Docker containers and model checksums.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DfSuxA8lJbf/)

### 30. [DfQKAoLgqq4] Productizing Tools
> **Axiom:** *"Your tool worked for you. Now make it work for strangers."*

**Action Protocol / Context:**
The day you sell your internal tool to external users, it stops being a script and becomes an SLA: security, multi-tenancy, uptime, customer support, and legal liability.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DfQKAoLgqq4/)

### 31. [DfPmaAREdDi] The V2 Transition
> **Axiom:** *"The next phase is engineering, not more features."*

**Action Protocol / Context:**
Replacing expensive SaaS with custom AI software is stage 1. Making it enterprise-hardened for paying customers is stage 2.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DfPmaAREdDi/)

### 35. [DfIUvtMm_IS] Agent Logging
> **Axiom:** *"Your AI agents make mistakes every day, and nobody writes them down."*

**Action Protocol / Context:**
Build persistent mistake registries. When an agent hallucinates or makes a bad tool call, capture the trace and add it to regression unit tests.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DfIUvtMm_IS/)

### 51. [DeuBLzxgBrJ] Vendor Risk
> **Axiom:** *"Do not cancel Salesforce just to go rent from some kid down the street."*

**Action Protocol / Context:**
When replacing legacy SaaS, ensure your internal build has equal or better security, backup, and failover guarantees.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DeuBLzxgBrJ/)

### 81. [Dd7E7HcjyVx] Skill Priority
> **Axiom:** *"The one skill that matters in AI-directed engineering is evaluation."*

**Action Protocol / Context:**
Generating code is cheap and commoditized. The ability to audit, evaluate, benchmark, and guarantee system reliability is where all the economic value sits.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/Dd7E7HcjyVx/)

### 96. [DdgxTr7AcvO] Auth Security
> **Axiom:** *"An attacker just logged in as your user without a password."*

**Action Protocol / Context:**
Never rely on client-side state for auth checks. Verify JWT expiration, invalidate tokens on logout, and enforce server-side session revocations.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DdgxTr7AcvO/)

### 111. [DdJmMEOjhx7] Enterprise Readiness
> **Axiom:** *"Your enterprise deal will not close without SOC 2."*

**Action Protocol / Context:**
Enterprise buyers require compliance, access logs, least privilege, and disaster recovery. Bake these into your architecture from day one.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DdJmMEOjhx7/)

### 126. [Dcy-rVRD5jM] Billing Integrity
> **Axiom:** *"Your AI built your Stripe checkout, but did it verify webhook signatures?"*

**Action Protocol / Context:**
AI commonly hallucinates unverified webhook endpoints. An attacker can fake successful payments unless you verify raw body cryptographic signatures.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/Dcy-rVRD5jM/)

### 186. [DbgDhezjelJ] Secrets Management
> **Axiom:** *"Seven out of my last ten audits had API keys committed to GitHub."*

**Action Protocol / Context:**
Run automated pre-commit secret scanners. Never put live API keys in `.env` files checked into source control.

🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/DbgDhezjelJ/)


---

## Complete 192 Reels Master Directory

Use this table to find the exact reel for any operational topic, or run `python3 scripts/search_reels.py <keyword>` in terminal.


| # | Shortcode | Operational Category | Problem Hook / First Line | Core Lesson / Axiom | Direct Instagram Link |
|:---:|:---:|---|---|---|:---:|
| 1 | `Df-gRBWTMIx` | AI Security, Sandboxing & Kill Switches | Your AI might be allowed to install software and run commands on your machine right now. | Size the system, not the model. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Df-gRBWTMIx/) |
| 2 | `Df98umcsiQu` | AI Security, Sandboxing & Kill Switches | Somebody's AI is installing software on their computer right now, and they never asked it to. | Size the whole system, not just the model. Speed is nice. Control is the job. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Df98umcsiQu/) |
| 3 | `Df77fNrqaGJ` | Model Sovereignty & Local AI Infrastructure | If the site you download your AI models from went dark tomorrow, could your business still run? | If you do not hold the files, you do not hold the model. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Df77fNrqaGJ/) |
| 4 | `Df7g4EguO-D` | Model Sovereignty & Local AI Infrastructure | The rumors around Jensen Huang are swirling. | My answer to which team I am on: if you rent your AI, you are on your vendor's team. Own the fi | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Df7g4EguO-D/) |
| 5 | `Df5WpFUooIM` | Vibe Coding Hardening & The 20% Production Gap | Your AI can build eighty percent of your app in one prompt. | Make it prove the work: one check script for tests, types, linting and a dependency scan, and n | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Df5WpFUooIM/) |
| 6 | `Df4zHtHRYfB` | Vibe Coding Hardening & The 20% Production Gap | Seventeen times in two weeks. | See full caption | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Df4zHtHRYfB/) |
| 7 | `Df2x1f-NSrv` | Operator Mindset & Commercializing Internal Tools | I keep getting called out in my comments. | The moment a bot answers for you, the conversation is over. Manufactured engagement looks great | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Df2x1f-NSrv/) |
| 8 | `Dfzpggrp41g` | Vibe Coding Hardening & The 20% Production Gap | Your AI-built app looks finished. | Before a customer touches it, ask: where does the data live, does the server check permissions, | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dfzpggrp41g/) |
| 9 | `DfxoWqOiQkB` | Insurance, SOC 2, Audits & Legal Liability | Your insurer asks how your AI systems work, and you have nothing to hand them. | Proof is cheaper than premiums. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfxoWqOiQkB/) |
| 10 | `DfxEudfhKkI` | Insurance, SOC 2, Audits & Legal Liability | Your insurance company is not wrong about AI. | Call your agent this week: what does my policy say about AI, and what would you need to see to  | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfxEudfhKkI/) |
| 11 | `DfvDeF1MJYY` | Multi-Tenancy, Auth & Data Leaks | Your first paying customer can see your second customer's data. | Separation you have not tested is a hope. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfvDeF1MJYY/) |
| 12 | `Dfuf5YRMxKd` | Founder Bootstrapping, Client Equity & Cash Flow | You are protecting your idea from the wrong person. | The only answer that holds up is that they are paying you to build it for them. Stop guarding t | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dfuf5YRMxKd/) |
| 13 | `Dfseri6v4wh` | Shadow AI & Team Governance | Your staff are already building tools with AI, on their own laptops, with your data. | See full caption | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dfseri6v4wh/) |
| 14 | `Dfr7HAkHxPK` | Shadow AI & Team Governance | Sixty-four percent of the AI your staff uses at work runs on their personal accounts. | Wall Street already paid over two billion dollars in fines because employees did business on pe | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dfr7HAkHxPK/) |
| 15 | `DfnVLueCk7K` | AI Security, Sandboxing & Kill Switches | One of your AI agents goes rogue at 2 AM. | A kill switch you have never pulled is a guess. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfnVLueCk7K/) |
| 16 | `DfmxiCrEjqb` | Shadow AI & Team Governance | Somebody on your team is building software with AI today, and you could not tell me who signs f | Decide three things this week: who may build, where they build, and who signs for anything that | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfmxiCrEjqb/) |
| 17 | `DfkMuQTGZQl` | Operator Mindset & Commercializing Internal Tools | The first thing you automate decides whether AI works in your business. | Answer three questions: what does everything sit on, what has a deadline, and what would prove  | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfkMuQTGZQl/) |
| 18 | `DfiLiSKDKh9` | AI Security, Sandboxing & Kill Switches | Your AI sandbox probably has the internet turned on. | If it can reach the internet, it is not a sandbox. It is a suggestion. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfiLiSKDKh9/) |
| 19 | `Dfhn_K_kZ4z` | Model Sovereignty & Local AI Infrastructure | Why is it that only two AI companies keep telling you the world might end? | Fear is a fundraising strategy. Silence is a PR strategy. Neither one is a security strategy. T | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dfhn_K_kZ4z/) |
| 20 | `DffU5-sAbmE` | Founder Bootstrapping, Client Equity & Cash Flow | If nobody is paying you to build it, stop building it. | The longer you hold on to your entity, your IP, and your product, the more you gain. Protect th | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DffU5-sAbmE/) |
| 21 | `DfdB9ulIJ0H` | Shadow AI & Team Governance | Somebody on your team clicked Allow All on an AI tool this month and now you just got hacked. | Every grant is a key. Count your keys. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfdB9ulIJ0H/) |
| 22 | `DfceXrLjeer` | Insurance, SOC 2, Audits & Legal Liability | Somebody wants to put twenty AI products in your business for free. | He is not installing twenty tools. He is moving in twenty new landlords. The setup is free. The | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfceXrLjeer/) |
| 23 | `DfZ9Tl5jgLH` | Operator Mindset & Commercializing Internal Tools | The CEO of Palantir just said the quiet part out loud on Wall Street. | Rebuild one workflow from the inside, prove it, then expand. Stop counting who logged in. Pick  | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfZ9Tl5jgLH/) |
| 24 | `DfX4U16giDL` | Founder Bootstrapping, Client Equity & Cash Flow | If you are raising money this year, VC is the very last place I would start. | A Wharton and University of Zurich study found 88% of venture-backed founders walk away with no | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfX4U16giDL/) |
| 25 | `DfXUwKpiUNv` | Founder Bootstrapping, Client Equity & Cash Flow | In a room full of founders at a VC event, I called a VC out. | Before you pitch anybody, check them out the way they check you out. Pull their Form ADV. Ask t | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfXUwKpiUNv/) |
| 26 | `DfVTlFYCeyN` | Insurance, SOC 2, Audits & Legal Liability | Your AI agents need a boss. | If nobody owns the agent, the agent owns the risk. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfVTlFYCeyN/) |
| 27 | `DfUv65LlCOo` | Vibe Coding Hardening & The 20% Production Gap | Cisco just bet its legacy code on two people and unlimited AI. | AI writes it. A human owns it. If Cisco will not bolt AI onto its V1, why are you bolting it on | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfUv65LlCOo/) |
| 28 | `DfSuxA8lJbf` | Model Sovereignty & Local AI Infrastructure | You moved off Big AI and put an open-weight model on a rented server. | One. Private network only, no public domain on the model. Two. Every request through an authent | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfSuxA8lJbf/) |
| 29 | `DfSLIUpgR5w` | Model Sovereignty & Local AI Infrastructure | The company that sells you the model now wants to tell you how to use it. | Keep three things in your own hands. Which model runs which job. Where your data lives. How you | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfSLIUpgR5w/) |
| 30 | `DfQKAoLgqq4` | Operator Mindset & Commercializing Internal Tools | You built your own system with AI. | Your tool worked for you. Now make it work for strangers. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfQKAoLgqq4/) |
| 31 | `DfPmaAREdDi` | Operator Mindset & Commercializing Internal Tools | A solar equipment wholesaler in our community from Johannesburg sent me a message last week. | He is not a developer. He runs a wholesale business. And he built the software that runs his en | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfPmaAREdDi/) |
| 32 | `DfNBmfYmc0z` | Model Sovereignty & Local AI Infrastructure | Half a table of AI founders went silent over one question. | Take the question to your next leadership meeting. If your room goes quiet too, you know what t | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfNBmfYmc0z/) |
| 33 | `DfK5d1egJpe` | Operator Mindset & Commercializing Internal Tools | Every week someone asks me the same thing. | Buy the commodity. Build and own the layer that holds what you know. Skip that, and the day the | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfK5d1egJpe/) |
| 34 | `DfKV9hDjNkV` | Operator Mindset & Commercializing Internal Tools | A business owner posted that he has been having a silent panic attack for three days. | Stop asking whether they can copy your product. Ask what you own that a copy cannot carry. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfKV9hDjNkV/) |
| 35 | `DfIUvtMm_IS` | Operator Mindset & Commercializing Internal Tools | Your AI agents make mistakes every day, and nobody writes them down. | Your mistakes are data. The most honest data you have. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfIUvtMm_IS/) |
| 36 | `DfHxIHyFfCt` | Insurance, SOC 2, Audits & Legal Liability | Check your business insurance this week. | Call your broker and ask whether your policy covers what your AI does. Then get your answers re | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfHxIHyFfCt/) |
| 37 | `DfFv5YsE0ff` | Insurance, SOC 2, Audits & Legal Liability | Step one of almost every AI consultant's process is exactly the same. | If step one of learning to hunt is shoot yourself in the foot, you would want to know. The ques | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfFv5YsE0ff/) |
| 38 | `DfFMYaoDVKE` | Insurance, SOC 2, Audits & Legal Liability | Your AI consultant got the job over lunch. | Before anyone touches your business, ask five questions. Entity and insurance? What is running  | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfFMYaoDVKE/) |
| 39 | `DfDLJk3DDP8` | Model Sovereignty & Local AI Infrastructure | Your company runs every AI task through the same model. | Your rules: read every license for display clauses, revenue limits, and origin. The model is no | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfDLJk3DDP8/) |
| 40 | `DfCnk6HDCsd` | Insurance, SOC 2, Audits & Legal Liability | Every headline today says AI agents are a cybersecurity threat running wild across the internet | The attacker's AI is going to audit your V1 whether you hire anybody or not. The only question  | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfCnk6HDCsd/) |
| 41 | `DfAmYQQDsNW` | Insurance, SOC 2, Audits & Legal Liability | Your team wants to fine-tune an AI model on your company documents. | Knowledge in the folder. Behavior in the model. Both in your building. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfAmYQQDsNW/) |
| 42 | `DfACtfKDB6X` | Shadow AI & Team Governance | Doctors and lawyers are getting paid up to four hundred dollars an hour to teach AI how they th | If your expertise has a market price, the first buyer should be you. Capture how your best peop | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DfACtfKDB6X/) |
| 43 | `De-Bh2eiEZo` | Operator Mindset & Commercializing Internal Tools | You bought a graphics card to run AI locally and it ran out of memory on the first real task. | Size the job first. The hardware sizes itself. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/De-Bh2eiEZo/) |
| 44 | `De9d7hagt6G` | Model Sovereignty & Local AI Infrastructure | Two of you said it under my videos. | With rented hosting you rent electricity. You do not need to own the building. You need to own  | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/De9d7hagt6G/) |
| 45 | `De7cuAQCUnR` | Insurance, SOC 2, Audits & Legal Liability | Your customer asks your voice agent a question. | Nobody waits three seconds for a person. They will not wait for your agent either. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/De7cuAQCUnR/) |
| 46 | `De4UalZk2rp` | AI Security, Sandboxing & Kill Switches | In the last six weeks, every major lab put an AI agent in regular people's hands. | The agent did not go rogue. Nobody was in the director's chair. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/De4UalZk2rp/) |
| 47 | `De19Vkblefh` | Model Sovereignty & Local AI Infrastructure | Uh oh, here we go again. | Nobody handled the keys. Keys in a vault you control. Short-lived and scoped to one job. Agents | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/De19Vkblefh/) |
| 48 | `DezuUdKnLrI` | Operator Mindset & Commercializing Internal Tools | Your AI assistant knows how you price, how you quote, and how you handle your hardest client. | Your knowledge should outlive every tool you use. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DezuUdKnLrI/) |
| 49 | `Dewl-QKiMQH` | Model Sovereignty & Local AI Infrastructure | Someone under my videos said some of us have no choice but to feed Big AI. | Today is phase zero. Write down where your business knowledge lives right now. That list is you | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dewl-QKiMQH/) |
| 50 | `DeukxXGD8DP` | Model Sovereignty & Local AI Infrastructure | A petroleum engineer messaged me. | The value of AI for an expert is that it carries what you know further than you can alone. But  | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DeukxXGD8DP/) |
| 51 | `DeuBLzxgBrJ` | Model Sovereignty & Local AI Infrastructure | Do not cancel Salesforce just to go rent from some kid down the street. | Before you subscribe to anyone, ask one question. If I fire you tomorrow, does it still run, an | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DeuBLzxgBrJ/) |
| 52 | `Der_8AlFQ6g` | Model Sovereignty & Local AI Infrastructure | Open weight models are within a few percentage points of the frontier. | The standard for V2 is open weight. Not because it is cheaper. Because it is yours. Open weight | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Der_8AlFQ6g/) |
| 53 | `DercXZ_DrhR` | Model Sovereignty & Local AI Infrastructure | An AI operating system is not software you install. | An AIOS answers five questions for the whole organization. What agents are running. What they c | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DercXZ_DrhR/) |
| 54 | `DepbJp0gmaC` | Model Sovereignty & Local AI Infrastructure | A healthcare CEO cancelled six hundred thousand dollars a year in Salesforce licensing last mon | Every SaaS renewal in your inbox is a decision you did not have last year. Renew and keep renti | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DepbJp0gmaC/) |
| 55 | `Deo3htrCNrq` | Model Sovereignty & Local AI Infrastructure | A follower just asked what hardware to buy to run AI models locally. | Start with the architecture. The GPU is a component. The architecture is the system that makes  | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Deo3htrCNrq/) |
| 56 | `DemSvaaCFpk` | Model Sovereignty & Local AI Infrastructure | Most people pick one AI model and use it for everything. | Right model. Right job. Right cost. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DemSvaaCFpk/) |
| 57 | `DekRlVGgdlF` | Model Sovereignty & Local AI Infrastructure | Everyone talks about building with AI. | The difference between V1 and V2 is not the technology. It is ownership. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DekRlVGgdlF/) |
| 58 | `DejuBdmEh6E` | Insurance, SOC 2, Audits & Legal Liability | A developer got frustrated with Adobe's cancellation fees last week. | The question is no longer whether you can build it yourself. The question is whether you can af | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DejuBdmEh6E/) |
| 59 | `DehJPaoka20` | Insurance, SOC 2, Audits & Legal Liability | Someone in my builders community said training a model on business data sounds like building a  | One is a filing cabinet. The other is an employee who learned from every document and can make  | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DehJPaoka20/) |
| 60 | `DefH8-xjFAl` | Insurance, SOC 2, Audits & Legal Liability | Agentic engineering is what the platforms sell. | The industry is building toward what I have been teaching. Not the other way around. I defined  | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DefH8-xjFAl/) |
| 61 | `DeekYqnDRa3` | Model Sovereignty & Local AI Infrastructure | Everyone talks about owning your data. | Your next AI starts from zero. V2 changes that. When the model runs on your hardware the map li | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DeekYqnDRa3/) |
| 62 | `DecjKMbjpnI` | Model Sovereignty & Local AI Infrastructure | The CEO of movie and TV location scouting business in New Jersey messaged me with seven questio | He is a business owner. And he is asking the right questions before most engineers do. Sovereig | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DecjKMbjpnI/) |
| 63 | `Deb_nA4glLw` | Model Sovereignty & Local AI Infrastructure | Influencers are comparing tools. | On the other side you build sovereign. Your model. Your data. Your hardware. Your map. The fork | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Deb_nA4glLw/) |
| 64 | `DeZ-amBivrs` | Founder Bootstrapping, Client Equity & Cash Flow | After the migration is done and the model is trained on your data you have something no competi | The companies that figure this out build moats that cannot be crossed with a credit card and an | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DeZ-amBivrs/) |
| 65 | `DeZa0oID9qQ` | Model Sovereignty & Local AI Infrastructure | Everyone asks how to move off their SaaS stack without breaking everything. | The result is an AI-native operation trained on your actual business history. Not a cutover. A  | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DeZa0oID9qQ/) |
| 66 | `DeXDvA3gaQR` | Model Sovereignty & Local AI Infrastructure | A solo developer messaged me this week. | The gap between people who talk about AI and people who build with it is getting wider every we | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DeXDvA3gaQR/) |
| 67 | `DeUfAcNFCpH` | Insurance, SOC 2, Audits & Legal Liability | My free builders community has courses across 13 layers. | Hundreds of courses. Thirteen layers. One skill. Know the system well enough to direct the mach | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DeUfAcNFCpH/) |
| 68 | `DeR6NlhDpMy` | Insurance, SOC 2, Audits & Legal Liability | Everyone wants to train their own model. | The data is not some external dataset you have to license. It is the operational history of you | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DeR6NlhDpMy/) |
| 69 | `DePrPWtAW3k` | API Keys, Secrets & Infrastructure Failures | Researchers found 13,000 private screenshots from 300 companies on public GitHub. | Know what your tools are doing. Own the pipeline or the pipeline owns your data. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DePrPWtAW3k/) |
| 70 | `DePHrhRgU-o` | Insurance, SOC 2, Audits & Legal Liability | Someone in my community asked what tool to use for training an AI model. | See full caption | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DePHrhRgU-o/) |
| 71 | `DeMwi22jK43` | Insurance, SOC 2, Audits & Legal Liability | I keep getting asked the difference between a business running AI and an AI-native business. | The businesses that rebuild will operate at a level the decorators cannot reach. Stop decoratin | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DeMwi22jK43/) |
| 72 | `DeKnTA5k4P5` | Model Sovereignty & Local AI Infrastructure | I ran the numbers on self-hosting versus API calls. | Run the numbers. Then run your own model. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DeKnTA5k4P5/) |
| 73 | `DeJ-G0SiRow` | Insurance, SOC 2, Audits & Legal Liability | The U.S. | The Senate just made that a legal requirement. If you deploy agents without a directing framewo | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DeJ-G0SiRow/) |
| 74 | `DeHf-prAh31` | Model Sovereignty & Local AI Infrastructure | You do not need to bolt AI onto your business. | Stop bolting. Start rebuilding. The operating system is the product. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DeHf-prAh31/) |
| 75 | `DeFCJUSFJSy` | Insurance, SOC 2, Audits & Legal Liability | Before you hire an AI consultant ask them these 15 questions. | I built this list because I keep cleaning up after people who could not pass it. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DeFCJUSFJSy/) |
| 76 | `DeCdXHUib0j` | Model Sovereignty & Local AI Infrastructure | Someone asked me to show the full pipeline. | Four steps between dependency and ownership. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DeCdXHUib0j/) |
| 77 | `DeAOg_Hkol6` | Insurance, SOC 2, Audits & Legal Liability | An attacker downloaded your entire user database from a public cloud storage bucket. | Your cloud storage should store your data. Not serve it to anyone who asks. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DeAOg_Hkol6/) |
| 78 | `Dd_q030j5CF` | Model Sovereignty & Local AI Infrastructure | Every time I post about sovereignty the same question shows up. | Know both footprints. Choose the one that matches what you are building. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dd_q030j5CF/) |
| 79 | `Dd9ptTkDJha` | Model Sovereignty & Local AI Infrastructure | Three companies launched autonomous AI agents in the same week. | The agent race is not about who builds the best agent. It is about who owns it. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dd9ptTkDJha/) |
| 80 | `Dd9GHhdDgom` | Model Sovereignty & Local AI Infrastructure | Everyone is arguing about Claude versus GPT. | The model race is a distraction. The ownership race is what matters. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dd9GHhdDgom/) |
| 81 | `Dd7E7HcjyVx` | Model Sovereignty & Local AI Infrastructure | The youngest self-made billionaire in AI just named the one skill that matters. | The people who move early in every tech shift win. Now the youngest billionaire in AI is saying | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dd7E7HcjyVx/) |
| 82 | `Dd4gCVAFb2T` | API Keys, Secrets & Infrastructure Failures | A client called me this morning to fix an AI deployment that failed three weeks after launch. | See full caption | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dd4gCVAFb2T/) |
| 83 | `Dd17OCRAV9s` | Model Sovereignty & Local AI Infrastructure | Every dollar you spend on a frontier API builds someone else's valuation. | Own the model. Own the data. Own the margin. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dd17OCRAV9s/) |
| 84 | `Dd1Xt-zETRJ` | Vibe Coding Hardening & The 20% Production Gap | An attacker moved from a compromised marketing tool to your production database. | One breach should give an attacker one service. Not your entire operation. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dd1Xt-zETRJ/) |
| 85 | `Ddyy2G3kwC7` | API Keys, Secrets & Infrastructure Failures | An attacker read your user's private data from a different website. | Your API has a guest list. Right now everyone is on it. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Ddyy2G3kwC7/) |
| 86 | `DduM5W5k4HF` | API Keys, Secrets & Infrastructure Failures | An attacker sent fake payment confirmations to your Stripe webhook. | See full caption | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DduM5W5k4HF/) |
| 87 | `DdtpUHxiirn` | Insurance, SOC 2, Audits & Legal Liability | An attacker walked through your application firewall. | Direct your AI to install ModSecurity in blocking mode. Configure Fail2ban on the logs. An open | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdtpUHxiirn/) |
| 88 | `DdroHsllR2T` | Multi-Tenancy, Auth & Data Leaks | A doctor in Pakistan just vibe coded a HIPAA-compliant hospital management system. | He sent me a message. "I used your videos to improve my app." This is not a demo. This is produ | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdroHsllR2T/) |
| 89 | `DdrEewmD01_` | Multi-Tenancy, Auth & Data Leaks | An attacker intercepted your magic link and landed inside your user's dashboard. | Your magic link removes the password. It should not remove the security. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdrEewmD01_/) |
| 90 | `DdpDWXlD-Nn` | Insurance, SOC 2, Audits & Legal Liability | Last week I showed you the software. | Your prompts are your IP. Here is what to run them on. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdpDWXlD-Nn/) |
| 91 | `DdoftC9DnTP` | Insurance, SOC 2, Audits & Legal Liability | An attacker exploited a known vulnerability in your caching layer. | Your code depends on software other people maintain. When those people move, your security move | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdoftC9DnTP/) |
| 92 | `DdmeiTlACNc` | Insurance, SOC 2, Audits & Legal Liability | The CEO of the most influential AI company on the planet asked the entire industry to stop buil | Follow the filing. Not the essay. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdmeiTlACNc/) |
| 93 | `Ddl66hIAIkY` | Multi-Tenancy, Auth & Data Leaks | A member failed an exam because her AI argued with the curriculum. | When your AI argues with a standard, that is the moment you are being tested. The exam was righ | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Ddl66hIAIkY/) |
| 94 | `Ddj5rEuCSpf` | Insurance, SOC 2, Audits & Legal Liability | A founder asked how a solo builder keeps up with compliance when the laws change faster than th | A quarterly review takes two hours. A regulatory fine takes two years. The law does not care th | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Ddj5rEuCSpf/) |
| 95 | `DdjWI7CDKC3` | Insurance, SOC 2, Audits & Legal Liability | An attacker just embedded your entire app inside their website. | Both headers, every response. One header. Two versions. That is all it takes. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdjWI7CDKC3/) |
| 96 | `DdgxTr7AcvO` | Multi-Tenancy, Auth & Data Leaks | An attacker just logged in as your user without a password. | Your session is your user's identity. If it does not change when their identity changes, it bel | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdgxTr7AcvO/) |
| 97 | `DdewD5fFOjE` | Multi-Tenancy, Auth & Data Leaks | An attacker just used your login page to send your users to a phishing site. | Your login page is your user's front door. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdewD5fFOjE/) |
| 98 | `DdeMk-bFdui` | Multi-Tenancy, Auth & Data Leaks | An attacker just used a password reset link from four months ago. | Your password reset is a door. Your AI built it without a lock. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdeMk-bFdui/) |
| 99 | `DdcLYmyCCXH` | Model Sovereignty & Local AI Infrastructure | Everyone asked the same question this week. | Your prompts are your IP. Stop handing them to a company building its IPO on top of them. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdcLYmyCCXH/) |
| 100 | `DdbnwpOiEZJ` | Vibe Coding Hardening & The 20% Production Gap | An attacker just downloaded your entire API schema. | Your schema is for your application. An attacker should never see it. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdbnwpOiEZJ/) |
| 101 | `DdZmhq3D2i_` | Insurance, SOC 2, Audits & Legal Liability | The second largest law firm in America just told OpenAI, Anthropic, and Google "no thank you.". | This is where enterprise AI is heading. Not more subscriptions. Ownership. Your data is not the | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdZmhq3D2i_/) |
| 102 | `DdZDAYDkr3A` | Insurance, SOC 2, Audits & Legal Liability | Your user's full database record is in their browser right now. | Audit every Server Component that receives database results. Your UI is a window. The payload i | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdZDAYDkr3A/) |
| 103 | `DdXBw5CCWyS` | Insurance, SOC 2, Audits & Legal Liability | I need to tell you something that's going to make you uncomfortable. | They need you dependent. They need you paying the subscription. Wake up. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdXBw5CCWyS/) |
| 104 | `DdWeKvGDz5k` | Multi-Tenancy, Auth & Data Leaks | An attacker just accessed every protected page in your app without logging in. | Middleware is a convenience layer. If it is your only check, it is your weakest one. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdWeKvGDz5k/) |
| 105 | `DdUc_1qClhy` | Operator Mindset & Commercializing Internal Tools | When every news channel says the same thing on the same day, I don't get scared. | This is not a warning. This is a business strategy. Monopolies disguised as safety are the bigg | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdUc_1qClhy/) |
| 106 | `DdPTYpBAiuY` | Insurance, SOC 2, Audits & Legal Liability | An attacker sent a phishing email from your domain. | Your domain reputation is your business reputation. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdPTYpBAiuY/) |
| 107 | `DdOvuLgiUiv` | Insurance, SOC 2, Audits & Legal Liability | An attacker just skipped your entire form and sent raw data to your API. | The form catches mistakes. The server catches attacks. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdOvuLgiUiv/) |
| 108 | `DdMufvsE6Z3` | API Keys, Secrets & Infrastructure Failures | Your server just charged the same card twice, provisioned the same user twice, sent the same em | The signature proves the sender. Idempotency proves you only acted once. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdMufvsE6Z3/) |
| 109 | `DdMK_2Cj09R` | Vibe Coding Hardening & The 20% Production Gap | Two frontier models shipped last week and most builders never checked the price. | The routing decision is worth more than the model. The model is the raw material. You are the p | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdMK_2Cj09R/) |
| 110 | `DdKJvRxjm6M` | Vibe Coding Hardening & The 20% Production Gap | Thousands of people scraped your prompt this week and you have no idea it happened. | Your prompts are your product. Treat them like it. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdKJvRxjm6M/) |
| 111 | `DdJmMEOjhx7` | Insurance, SOC 2, Audits & Legal Liability | Your enterprise deal will not close without SOC 2. | AI did to compliance what it did to development. The gate is still there. The cost to walk thro | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdJmMEOjhx7/) |
| 112 | `DdHlEdhgsvV` | API Keys, Secrets & Infrastructure Failures | 32% of companies stopped buying software and built it with AI. | The tools are free. The direction is the product. The 22% need you. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdHlEdhgsvV/) |
| 113 | `DdHBY76jE2o` | API Keys, Secrets & Infrastructure Failures | An attacker just typed a crafted string into your search field and your database returned every | The ORM is not the vulnerability. The one place your AI bypassed it is. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdHBY76jE2o/) |
| 114 | `DdFAKgdgqc3` | Insurance, SOC 2, Audits & Legal Liability | We watched thousands of builders use our products for sixty days. | The data told us what to build. We built it. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdFAKgdgqc3/) |
| 115 | `DdEcldEktWP` | Multi-Tenancy, Auth & Data Leaks | Someone just promoted themselves to admin in your app by editing one field in a JWT. | Your auth provider did its job. Your AI never verified its work. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdEcldEktWP/) |
| 116 | `DdCbUuPFMA9` | AI Security, Sandboxing & Kill Switches | NIST says most agents run on borrowed credentials. | Direct your agents or they direct themselves. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdCbUuPFMA9/) |
| 117 | `DdB32a5lOZF` | Multi-Tenancy, Auth & Data Leaks | An attacker just grabbed your Google Login authorization code on a mobile network and logged in | Direct your AI to implement both layers. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DdB32a5lOZF/) |
| 118 | `Dc_2p2XiTEY` | Vibe Coding Hardening & The 20% Production Gap | You want to be an AI builder. | Show up prepared. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dc_2p2XiTEY/) |
| 119 | `Dc9Rv5LksSj` | Vibe Coding Hardening & The 20% Production Gap | Your AI shipped three products this quarter. | One product at 5% beats ten at zero. Your AI builds anything. The question is whether anyone as | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dc9Rv5LksSj/) |
| 120 | `Dc808nfFdi-` | Insurance, SOC 2, Audits & Legal Liability | CodeRabbit reviewed your code and found zero issues. | Test by sending fields that should be rejected. CodeRabbit reviews code. Not attack surface. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dc808nfFdi-/) |
| 121 | `Dc6s_Nqj2wo` | Vibe Coding Hardening & The 20% Production Gap | Every business within five miles of you has a scheduling problem they are paying someone else t | Build a system for one operator. Then sell it to every operator in your market. Stop paying for | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dc6s_Nqj2wo/) |
| 122 | `Dc4IJo3EWLB` | Vibe Coding Hardening & The 20% Production Gap | They call me grandpa AI in the comments. | The next ten years belong to this generation. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dc4IJo3EWLB/) |
| 123 | `Dc3kkckjyYV` | Vibe Coding Hardening & The 20% Production Gap | Your AI stored your authentication token in localStorage. | Your auth token is the key. Stop leaving it on the counter. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dc3kkckjyYV/) |
| 124 | `Dc1jZHyiWz0` | Insurance, SOC 2, Audits & Legal Liability | Your API uses the user ID in the URL to load their data. | Your API should not trust the URL. It should trust the session. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dc1jZHyiWz0/) |
| 125 | `Dc0_yCoHNXv` | API Keys, Secrets & Infrastructure Failures | Your AI put your database credentials in a Next.js Server Action. | Your server functions run on the server. Your credentials should stay there. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dc0_yCoHNXv/) |
| 126 | `Dcy-rVRD5jM` | API Keys, Secrets & Infrastructure Failures | Your AI built your Stripe checkout. | Your checkout page is not your pricing. Your server is. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dcy-rVRD5jM/) |
| 127 | `DcybEeAEhP8` | API Keys, Secrets & Infrastructure Failures | Your app just showed a user your database name, your server file path, and the query that faile | Your users found a bug. Do not let the bug report write itself. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcybEeAEhP8/) |
| 128 | `DcwZzLckxZ4` | Vibe Coding Hardening & The 20% Production Gap | You added Sign in with Google. | Your users trust that login button. Make sure it only works for you. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcwZzLckxZ4/) |
| 129 | `Dcv2OyCiGkc` | Vibe Coding Hardening & The 20% Production Gap | You are using the same AI to build and review your code. | The ones getting the best results know which platform to assign to which job. Same build. Diffe | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dcv2OyCiGkc/) |
| 130 | `Dct1A_WDsrP` | Multi-Tenancy, Auth & Data Leaks | You added a chat widget to your site. | Implement a Content Security Policy. You control your code. Control who else gets to run theirs | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dct1A_WDsrP/) |
| 131 | `DctRagnk9uk` | Vibe Coding Hardening & The 20% Production Gap | You have 47 skills loaded into your AI right now. | Apply. Verify. Dispose. Your AI got smarter every month. Your skills did not. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DctRagnk9uk/) |
| 132 | `DcrQPBHG0_I` | Insurance, SOC 2, Audits & Legal Liability | Your admin dashboard has no authentication. | Your admin panel is the keys to your business. Right now those keys are on the sidewalk. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcrQPBHG0_I/) |
| 133 | `DcqspRtHPGB` | Vibe Coding Hardening & The 20% Production Gap | Your database has been doing a full table scan on every request since launch. | Fix it before your hosting provider fixes it for you. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcqspRtHPGB/) |
| 134 | `DcoreqwDW0N` | Insurance, SOC 2, Audits & Legal Liability | You used one AI to build your entire app. | Rotate which platform builds and which reviews. One AI builds. A different AI breaks it. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcoreqwDW0N/) |
| 135 | `DcoH5avEj3J` | Vibe Coding Hardening & The 20% Production Gap | Your mobile app sends every API call in plain text. | Fix the transport before your users pay for it. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcoH5avEj3J/) |
| 136 | `DcmGq_pDYk8` | Vibe Coding Hardening & The 20% Production Gap | You built an AI feature into your app. | Your AI feature is a door into your system. Make sure users can only open their own room. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcmGq_pDYk8/) |
| 137 | `Dci-Qq_j9EL` | Vibe Coding Hardening & The 20% Production Gap | You moved to a VPS for more control. | Three fixes. Five minutes each. Direct your AI to lock it down before someone else walks in. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dci-Qq_j9EL/) |
| 138 | `Dcg9G7PjY6E` | API Keys, Secrets & Infrastructure Failures | You installed an npm package last week. | Your code is only as trustworthy as your least-trusted dependency. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dcg9G7PjY6E/) |
| 139 | `DcgZbSGgZ9z` | Multi-Tenancy, Auth & Data Leaks | Your API is configured to accept requests from any origin with credentials. | Your users trust your domain. Your server is handing that trust to anyone who asks. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcgZbSGgZ9z/) |
| 140 | `DceYRVpCFKG` | Vibe Coding Hardening & The 20% Production Gap | Your AI agent fetches any URL a user submits. | Your agent works for you. Make sure it only talks to who you approve. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DceYRVpCFKG/) |
| 141 | `Dcd0uMTCHsl` | Operator Mindset & Commercializing Internal Tools | There are 10,000 business owners within 50 miles of you bleeding money on third-party fees. | Stop building platforms nobody asked for. Start solving problems people are already paying to h | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dcd0uMTCHsl/) |
| 142 | `DcbzcfyioD9` | API Keys, Secrets & Infrastructure Failures | You accept webhooks from Stripe without verifying the signature. | Stripe already secured their side. Secure yours. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcbzcfyioD9/) |
| 143 | `DcbP4U7G6QK` | Insurance, SOC 2, Audits & Legal Liability | AWS just killed Bedrock Agents. | Your cloud provider will always build the next thing. Architect so it does not break yours. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcbP4U7G6QK/) |
| 144 | `DcZOrpQCcZW` | API Keys, Secrets & Infrastructure Failures | You shipped your web app as a mobile app. | Your web app had a browser protecting it. Your mobile app does not. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcZOrpQCcZW/) |
| 145 | `DcYrFHSAOhJ` | Vibe Coding Hardening & The 20% Production Gap | Someone sent a forged request to your API last Tuesday. | Your API is your contract. Harden it. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcYrFHSAOhJ/) |
| 146 | `DcWGRX2G2l8` | Vibe Coding Hardening & The 20% Production Gap | You added one column to your database for one client. | Say yes to your biggest client. Say it architecturally. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcWGRX2G2l8/) |
| 147 | `DcUFF39Eu04` | Insurance, SOC 2, Audits & Legal Liability | Your app got featured on Product Hunt. | Your signup converts. Make your product convert too. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcUFF39Eu04/) |
| 148 | `DcThgrwlaDD` | Vibe Coding Hardening & The 20% Production Gap | You said yes to every client request for 18 months. | our best client should not be your most expensive client. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcThgrwlaDD/) |
| 149 | `DcRgRM2jjuv` | Vibe Coding Hardening & The 20% Production Gap | Your login endpoint received 14,000 requests last night. | You are paying for a wall. Configure it. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcRgRM2jjuv/) |
| 150 | `DcQ8u02Cj1A` | Vibe Coding Hardening & The 20% Production Gap | Every time a new client signs up, your developer forks the entire repository. | Feature flags per tenant. Configuration inheritance with overrides. Tenant-aware routing at the | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcQ8u02Cj1A/) |
| 151 | `DcO7fDEj9eg` | Insurance, SOC 2, Audits & Legal Liability | Your status page says operational. | 99.9% is not a badge. It is a budget. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcO7fDEj9eg/) |
| 152 | `DcOX9AdERD2` | Vibe Coding Hardening & The 20% Production Gap | Your database has two versions of every record right now. | Your database scaled. Your consistency did not. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcOX9AdERD2/) |
| 153 | `DcMWtOgEgaE` | Vibe Coding Hardening & The 20% Production Gap | GitHub just showed you exactly where your AI money goes. | Cost is now a system you engineer, not a number you react to. Read the report. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcMWtOgEgaE/) |
| 154 | `DcLzI-pFJlM` | Vibe Coding Hardening & The 20% Production Gap | Your AI pushed 47 files to production in one commit. | Branch protection. Automated checks. Scoped commits. Direct your AI to build the gate. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcLzI-pFJlM/) |
| 155 | `DcJx3MyDnHE` | Vibe Coding Hardening & The 20% Production Gap | You have paid your payment processor $30,000. | Stop activating expensive infrastructure before demand forces you to. Sandbox it. Demo it. Sell | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcJx3MyDnHE/) |
| 156 | `DcJOWioldeu` | Vibe Coding Hardening & The 20% Production Gap | One webhook failed. | Your app is only as strong as its weakest dependency. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcJOWioldeu/) |
| 157 | `DcHNH00EZ1T` | Vibe Coding Hardening & The 20% Production Gap | You put Cloudflare in front of your app. | Cloudflare is not a switch you flip. It is an architecture you configure. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcHNH00EZ1T/) |
| 158 | `DcGpmHHCug1` | Founder Bootstrapping, Client Equity & Cash Flow | Your AI just answered a customer's question with data from another customer's private documents | Your RAG system is only as safe as the boundaries around your data. Your AI never built any. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcGpmHHCug1/) |
| 159 | `DcEoX9xCZ8Q` | Vibe Coding Hardening & The 20% Production Gap | Your database just lost 14 hours of customer data. | Your backup is not your recovery plan. Your tested plan is. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcEoX9xCZ8Q/) |
| 160 | `DcEEyocD8II` | Vibe Coding Hardening & The 20% Production Gap | An attacker logged into your app at 3 AM from another country. | Static roles tell you who someone is. Context tells you whether to trust them right now. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcEEyocD8II/) |
| 161 | `DcCDhdAiqOZ` | Insurance, SOC 2, Audits & Legal Liability | Your customers are using a product that has never been inspected. | The inspection is overdue. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcCDhdAiqOZ/) |
| 162 | `DcBf7guDXSF` | Vibe Coding Hardening & The 20% Production Gap | You cannot learn to shoot content after your product. | Start talking now. Start badly. Start today. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DcBf7guDXSF/) |
| 163 | `Db_etk2ElsD` | Vibe Coding Hardening & The 20% Production Gap | Every company that builds its own software needs someone in-house who knows how to direct AI. | Someone who runs the audits, directs the AI to harden the builds, and manages the engineering p | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Db_etk2ElsD/) |
| 164 | `Db-7JyYDdas` | Vibe Coding Hardening & The 20% Production Gap | 10,000 people are working on your idea right now. | If the first thing you worry about is someone stealing your idea, you are not ready for this. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Db-7JyYDdas/) |
| 165 | `Db856-FiqP7` | Vibe Coding Hardening & The 20% Production Gap | MCP is a dead end. | Strip them out. Let your agent cook. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Db856-FiqP7/) |
| 166 | `Db8WTQLke0j` | Vibe Coding Hardening & The 20% Production Gap | An AI agent breached a company's production database this week. | Human-in-the-loop is not a guardrail without the right tools. Direction is architecture, not at | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Db8WTQLke0j/) |
| 167 | `Db6VI3WFqKD` | Vibe Coding Hardening & The 20% Production Gap | Your AI is running on six-month-old instructions. | We rebuild every 100 days. Version 9.0. Clear the stack. Rebuild clean. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Db6VI3WFqKD/) |
| 168 | `Db5xi3yEg4w` | Vibe Coding Hardening & The 20% Production Gap | The SaaS industry is built on feature bloat. | An AI Directed Engineer can build the 50 features you actually use for a fraction of what you p | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Db5xi3yEg4w/) |
| 169 | `Db3wYK6AZKx` | Vibe Coding Hardening & The 20% Production Gap | Your AI builds features. | Stop guessing what to build. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Db3wYK6AZKx/) |
| 170 | `Db3MvKXgYMd` | Vibe Coding Hardening & The 20% Production Gap | Your product on launch day is not your product. | Listen to the data. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Db3MvKXgYMd/) |
| 171 | `Db1LiS4E_sI` | Vibe Coding Hardening & The 20% Production Gap | You built it. | See full caption | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Db1LiS4E_sI/) |
| 172 | `Db0n5e6DAUl` | Vibe Coding Hardening & The 20% Production Gap | AI Directed Engineering gets you to launch. | Revenue is not luck. Revenue is engineered. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Db0n5e6DAUl/) |
| 173 | `Dbymz5CE5ZP` | Vibe Coding Hardening & The 20% Production Gap | If you are building for builders, your product needs to be something an agent can buy. | Builders are using AI to find their tools. If your product is not structured data an agent can  | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dbymz5CE5ZP/) |
| 174 | `DbyDJomAkQv` | Vibe Coding Hardening & The 20% Production Gap | Your AI built your database. | Direct your AI to write migrations that add before they remove, build the rollback before the m | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DbyDJomAkQv/) |
| 175 | `DbwB5V_EvJS` | Vibe Coding Hardening & The 20% Production Gap | Your AI agent forgot what it was doing halfway through the job. | Direct your AI to build a state file, decompose tasks into chunks, and validate between every s | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DbwB5V_EvJS/) |
| 176 | `DbveZVplEYz` | Vibe Coding Hardening & The 20% Production Gap | Every business on the planet is now a software company. | That is why we built the Conveyor Belt. Prototype in. Production out. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DbveZVplEYz/) |
| 177 | `DbtdHYklNf3` | Vibe Coding Hardening & The 20% Production Gap | Your idea is not your moat. | The business gets funded, not the idea. Protect your code. But understand what actually needs p | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DbtdHYklNf3/) |
| 178 | `Dbs8D1xAMnX` | Vibe Coding Hardening & The 20% Production Gap | Four AI security roles that did not exist two years ago. | See full caption | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dbs8D1xAMnX/) |
| 179 | `DbqUuqlk7L6` | Vibe Coding Hardening & The 20% Production Gap | Your user just saw your database password on their screen. | Split your error handling. Catch errors at every boundary. Build a logging pipeline. Fix it tod | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DbqUuqlk7L6/) |
| 180 | `DboLRcsl9ag` | Vibe Coding Hardening & The 20% Production Gap | Half of you said you do not care about the EU. | Your compliance obligations are determined by where your users are, not where you are. The inte | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DboLRcsl9ag/) |
| 181 | `Dbnv-2VCnl-` | Vibe Coding Hardening & The 20% Production Gap | You built your entire business on someone else's software. | Operators are figuring out they can build the 20% they actually need, own it, and stop paying r | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dbnv-2VCnl-/) |
| 182 | `Dblxs5jinu-` | Vibe Coding Hardening & The 20% Production Gap | Your AI product just became illegal and you do not know why. | If you do not disclose it, you are legally liable. The rules changed this week. Your AI does no | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/Dblxs5jinu-/) |
| 183 | `DblLMbonwGS` | Vibe Coding Hardening & The 20% Production Gap | Nobody is measuring whether their AI build is actually making money. | Direct your AI to build cost-per-feature tracking, per-user profitability, and a living P&L. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DblLMbonwGS/) |
| 184 | `DbjN2IVCeEm` | Vibe Coding Hardening & The 20% Production Gap | One kid with a laptop can take your entire product offline right now. | Direct your AI to fix that today. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DbjN2IVCeEm/) |
| 185 | `DbimVuCkZqi` | Insurance, SOC 2, Audits & Legal Liability | A customer just called you. | One cached query. Two customers. Zero trust left in your product. Your database security is irr | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DbimVuCkZqi/) |
| 186 | `DbgDhezjelJ` | API Keys, Secrets & Infrastructure Failures | Seven out of my last ten audits had API keys committed to GitHub. | I find this in 70% of the apps I review. Do not let yours be next. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DbgDhezjelJ/) |
| 187 | `DbeZo5Zx5i2` | Vibe Coding Hardening & The 20% Production Gap | Your AI keeps building new features while your existing features are broken. | Direct your AI to stop building and start fixing. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DbeZo5Zx5i2/) |
| 188 | `DbbaGawGG3_` | Vibe Coding Hardening & The 20% Production Gap | Your AI can find your perfect customer before you post a single ad. | Here is how. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DbbaGawGG3_/) |
| 189 | `DbaxXyTgbRR` | Insurance, SOC 2, Audits & Legal Liability | Your AI built an app that 1.3 billion people cannot use. | It never considered screen readers, keyboard navigation, or color contrast. Your AI built for u | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DbaxXyTgbRR/) |
| 190 | `DbZSrUOl6sN` | Vibe Coding Hardening & The 20% Production Gap | They just paid sixty billion dollars for the tool I teach you to use for free. | Be the person using the tool, not the person watching from the sidelines. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DbZSrUOl6sN/) |
| 191 | `DbY-1HLDHm6` | Vibe Coding Hardening & The 20% Production Gap | Your AI picked your infrastructure. | See full caption | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DbY-1HLDHm6/) |
| 192 | `DbYgfWbDWW2` | Vibe Coding Hardening & The 20% Production Gap | Your next customer might not be a human. | The fastest-growing shopping channel is not human. | [Watch Reel](https://www.instagram.com/mattmurphyai/reel/DbYgfWbDWW2/) |


---

## How to Query Offline via CLI

This repository includes a standalone search CLI `scripts/search_reels.py`.

```bash
# Search by keyword across all captions, hooks, and axioms
python3 scripts/search_reels.py "kill switch"
python3 scripts/search_reels.py "insurance"
python3 scripts/search_reels.py "stripe"

# Filter by category
python3 scripts/search_reels.py --category "Model Sovereignty"

# Inspect a specific reel in full
python3 scripts/search_reels.py --reel 15 --full
python3 scripts/search_reels.py --code DfnVLueCk7K --full

# List category breakdown
python3 scripts/search_reels.py --list-categories
```
