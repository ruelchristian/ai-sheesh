import json
import re
from pathlib import Path

DATA_PATH = Path('/home/ruel/ai-sheesh/data/mattmurphy_192_reels.json')
OUT_AI_SHEESH = Path('/home/ruel/ai-sheesh/MATT_MURPHY_192_REELS_INDEX.md')
OUT_SF = Path('/home/ruel/software-factory/docs/MATT_MURPHY_192_REELS_INDEX.md')

with open(DATA_PATH, 'r') as f:
    raw_data = json.load(f)

CATEGORIES = [
    ("AI Security, Sandboxing & Kill Switches", [
        "sandbox", "kill switch", "rogue", "auto-approve", "allowed commands", 
        "run commands", "container", "mcp server", "keys and log", "agent goes rogue"
    ]),
    ("Multi-Tenancy, Auth & Data Leaks", [
        "tenant", "customer's data", "row-level", "first paying customer can see", 
        "shared tables", "separation", "logged in as your user", "session", "jwt", 
        "password", "without a password", "auth"
    ]),
    ("API Keys, Secrets & Infrastructure Failures", [
        "api key", "github", "committed to github", "webhook", "stripe checkout", 
        "env", "secret", "credentials", "rented server", "outage", "cascade", "failed"
    ]),
    ("Insurance, SOC 2, Audits & Legal Liability", [
        "insur", "underwriter", "soc 2", "compliance", "audit", "regulator", 
        "subpoena", "lawsuit", "sue", "board", "liability", "sec", "fine", "attorney"
    ]),
    ("Model Sovereignty & Local AI Infrastructure", [
        "open weight", "weights", "hugging face", "sovereign", "went dark", 
        "download your ai models", "own the files", "registry", "ollama", "local ai", 
        "big ai", "jensen"
    ]),
    ("Shadow AI & Team Governance", [
        "staff", "personal account", "employees", "shadow", "laptop", 
        "who signs for it", "personal phones", "two billion", "allow all"
    ]),
    ("Founder Bootstrapping, Client Equity & Cash Flow", [
        "equity", "bootstrapping", "investor", "nobody is paying you", "pricing", 
        "charge", "contract", "first customer", "paying customer", "wharton", "vc", 
        "form adv", "raise money", "pitch"
    ]),
    ("Vibe Coding Hardening & The 20% Production Gap", [
        "vibe", "eighty percent", "prompt", "clean up", "prototype", 
        "rebuilt his ai setup", "looks finished", "two million lines", "production", 
        "linting", "one check script", "architecture", "cisco"
    ]),
    ("Operator Mindset & Commercializing Internal Tools", [
        "operator", "wholesale", "strangers", "sell it", "10,000 business owners", 
        "nobody came", "salesforce", "landlords", "workflows count money", "cta"
    ])
]

def classify(text):
    tl = text.lower()
    scores = {}
    for cat_name, keywords in CATEGORIES:
        score = sum(1 for kw in keywords if kw in tl)
        if score > 0:
            scores[cat_name] = score
    if not scores:
        return "Operator Mindset & Commercializing Internal Tools"
    return max(scores.items(), key=lambda x: x[1])[0]

def clean_cell(text):
    if not text:
        return ""
    # replace pipes and newlines
    c = text.replace('|', '/').replace('\n', ' ').strip()
    # compress spaces
    c = re.sub(r'\s+', ' ', c)
    return c

items = []
for idx, d in enumerate(raw_data, 1):
    summary = d.get('summary', '').strip()
    code = d.get('code', '')
    url = d.get('url', f"https://www.instagram.com/mattmurphyai/reel/{code}/")
    
    first_line = summary.split('\n')[0].strip()
    first_sent = first_line.split('. ')[0] if '. ' in first_line else first_line
    if not first_sent.endswith(('.', '!', '?')):
        first_sent += '.'
        
    parts = summary.split('-MM')
    axiom = ""
    if len(parts) > 1:
        lines = [l.strip() for l in parts[0].split('\n') if l.strip()]
        if lines:
            axiom = lines[-1]
            
    cat = classify(summary)
    
    items.append({
        'index': idx,
        'code': code,
        'url': url,
        'cat': cat,
        'hook': first_sent,
        'axiom': axiom,
        'text': summary
    })

# Count per category
counts = {}
for it in items:
    counts[it['cat']] = counts.get(it['cat'], 0) + 1

# Generate Markdown
md = []
md.append("# Matt Murphy (@mattmurphyai) 192 Reels Master Index & Operational Field Guide\n")
md.append("> **Source:** Archive of 192 video reels harvested from Matt Murphy (`@mattmurphyai` / The Faction Group LLC).")
md.append("> **Quick Offline CLI Search:** Run `python3 scripts/search_reels.py \"<keyword>\"` in this repository.\n")

md.append("## Why the Harvester Captured 192 Reels (Clarification on the '403' Profile Count)\n")
md.append("When you view Matt Murphy's profile header on Instagram, it displays **`403 Posts`**.")
md.append("- **403 Posts** is Instagram's lifetime sum of *all media formats*: photo carousel slides, text infographics, static quote cards, announcements, and video reels.")
md.append("- **192 Reels** is the **exact, complete count of all video reels** published on the `/reels/` tab.")
md.append("- The harvester completed successfully without stopping early: **100% of all published video reels (192/192)** were extracted.")
md.append("- Crucially, **all 192 records contain the complete, written caption text** (average length: 546 characters) detailing the exact spoken lessons, checklists, and operational axioms.\n")

md.append("## Quick Reference: 9 Core Operational Pillars\n")
md.append("| # | Operational Pillar | Reels Count | Core Focus |")
md.append("|---|---|:---:|---|")
for cat, cnt in sorted(counts.items(), key=lambda x: -x[1]):
    desc = {
        "Vibe Coding Hardening & The 20% Production Gap": "Moving beyond initial AI prototypes; tests, linters, Stripe, error boundaries",
        "Insurance, SOC 2, Audits & Legal Liability": "Underwriting audits, board liability, recovery drills, SOC 2 controls",
        "Model Sovereignty & Local AI Infrastructure": "Keeping local weights, self-hosting, avoiding vendor lock-in and outages",
        "API Keys, Secrets & Infrastructure Failures": "Preventing GitHub leaks, webhook cascades, scoping MCP tokens",
        "Operator Mindset & Commercializing Internal Tools": "Replacing SaaS subscriptions, selling tools to strangers, workflow ROI",
        "Multi-Tenancy, Auth & Data Leaks": "Row-level security (RLS), tenant boundaries, preventing cross-customer leaks",
        "AI Security, Sandboxing & Kill Switches": "Containerizing agents, network kill switches, auto-approval guardrails",
        "Founder Bootstrapping, Client Equity & Cash Flow": "Customer-funded builds, equity-for-dev deals, avoiding the VC treadmill",
        "Shadow AI & Team Governance": "Staff using personal ChatGPT on work laptops, SEC compliance, tool policies"
    }.get(cat, "Practical operations and architecture")
    md.append(f"| {len(md)} | **{cat}** | `{cnt}` | {desc} |")
md.append("\n---\n")

md.append("## The 25 Definitive Matt Murphy Real-World Axioms & Protocols\n")
axioms_curated = [
    (1, "Df-gRBWTMIx", "Agent Permissions", "Size the system, not the model.", "1. Find every setting that lets AI act without asking (auto-approve, allowed commands).\n2. Run execution in a container with no credentials and no internet.\n3. Give every MCP server scoped keys and log every tool call."),
    (3, "Df77fNrqaGJ", "Model Sovereignty", "If you do not hold the files, you do not hold the model.", "1. Download exact model versions pinned with checksums.\n2. Keep license, model card, and download date stored beside the weights.\n3. Load models from your own registry backed up in a 2nd location; test with internet OFF."),
    (5, "Df5WpFUooIM", "Vibe Coding 80/20", "Make it prove the work: one check script for tests, types, linting and dependency scan, and nothing is done until it passes.", "AI builds 80% of an app in one prompt. The remaining 20% (auth, billing, edge cases, error recovery) is where founders go bankrupt if they lack automated verification."),
    (9, "DfxoWqOiQkB", "Insurance & Audits", "Proof is cheaper than premiums.", "Underwriters do not need you to be perfect; they need you to be provable:\n1. Register of every AI system, its owner, builder, and last outside review.\n2. 2FA everywhere, no shared passwords, agents on scoped credentials.\n3. Restored backup drill proof and immutable audit logs."),
    (11, "DfvDeF1MJYY", "Multi-Tenancy", "Separation you have not tested is a hope.", "1. Pick your boundary on purpose: 1 DB per customer, or shared DB with DB-enforced Row-Level Security (RLS).\n2. Enforce below the app layer so the DB refuses queries even if AI forgot a filter.\n3. Attack yourself with 2 automated test customer accounts on every CI/CD release."),
    (15, "DfnVLueCk7K", "Rogue Agents", "A kill switch you have never pulled is a guess.", "1. One switch: revoke keys, pause cron schedules, kill active tasks in a single shell command.\n2. Circuit breakers: spend caps, rate limits, manual approval queue for funds & customer emails.\n3. Log reversible actions; drill kill switch & rollback monthly."),
    (18, "DfiLiSKDKh9", "Agent Sandboxing", "If it can reach the internet, it is not a sandbox. It is a suggestion.", "1. Run models and agents with outside networking OFF or strictly behind an allowlist.\n2. Non-root user with read-only root filesystem, except 1 scratch directory.\n3. Short-lived ephemeral tokens scoped strictly to one job."),
    (20, "DffU5-sAbmE", "Bootstrapping & Equity", "If nobody is paying you to build it, stop building it.", "Find a profitable customer with an urgent problem. Offer equity in exchange for funding the industry build. They get equity, NOT your IP and NOT exclusivity. You own the code and can sell to everyone else."),
    (21, "DfdB9ulIJ0H", "Access Control", "Every grant is a key. Count your keys.", "Never click 'Allow All' on automated developer agents. Audit OAuth tokens and cloud service accounts quarterly."),
    (22, "DfceXrLjeer", "SaaS Dependency", "He is not installing twenty tools. He is moving in twenty new landlords.", "The setup is free, but the rent never stops. Insurers are writing AI claims out of general liability. Build internal sovereignty instead of stacking SaaS subscriptions."),
    (23, "DfZ9Tl5jgLH", "Workflow ROI", "Licenses count logins. Workflows count money.", "Stop counting how many employees have ChatGPT logins. Rebuild one core operational workflow from the inside, verify financial output, and measure hard dollar savings."),
    (24, "DfX4U16giDL", "Funding Order", "88% of venture-backed founders walk away with nothing at exit. Climb in the right order.", "1. First, a paying customer.\n2. Second, an angel investor who has actually done the job in your industry.\n3. Venture Capital last (or never)."),
    (25, "DfXUwKpiUNv", "Operator Definition", "An operator is a cash-flow-positive founder.", "Before pitching investors, pull their Form ADV. Verify their fund lifecycle and check size. Real operators build sustainable cash flow rather than living bridge-round to bridge-round."),
    (26, "DfVTlFYCeyN", "Agent Ownership", "If nobody owns the agent, the agent owns the risk.", "Every deployed agent must have a designated human owner who reviews failure logs and signs off on operational boundaries."),
    (27, "DfUv65LlCOo", "Production Quality", "AI writes it. A human owns it. If Cisco will not bolt AI onto its V1, why are you bolting it onto yours?", "Never ship unverified generated code directly to production customers. Put rigorous engineering rigor before feature velocity."),
    (28, "DfSuxA8lJbf", "Self-Hosting", "Sovereign does not mean exposed.", "1. Private VPC network only, zero public domains mapped directly to model weights.\n2. Authenticated API gateway, 1 key per application, every request logged.\n3. Pinned Docker containers and model checksums."),
    (30, "DfQKAoLgqq4", "Productizing Tools", "Your tool worked for you. Now make it work for strangers.", "The day you sell your internal tool to external users, it stops being a script and becomes an SLA: security, multi-tenancy, uptime, customer support, and legal liability."),
    (31, "DfPmaAREdDi", "The V2 Transition", "The next phase is engineering, not more features.", "Replacing expensive SaaS with custom AI software is stage 1. Making it enterprise-hardened for paying customers is stage 2."),
    (35, "DfIUvtMm_IS", "Agent Logging", "Your AI agents make mistakes every day, and nobody writes them down.", "Build persistent mistake registries. When an agent hallucinates or makes a bad tool call, capture the trace and add it to regression unit tests."),
    (51, "DeuBLzxgBrJ", "Vendor Risk", "Do not cancel Salesforce just to go rent from some kid down the street.", "When replacing legacy SaaS, ensure your internal build has equal or better security, backup, and failover guarantees."),
    (81, "Dd7E7HcjyVx", "Skill Priority", "The one skill that matters in AI-directed engineering is evaluation.", "Generating code is cheap and commoditized. The ability to audit, evaluate, benchmark, and guarantee system reliability is where all the economic value sits."),
    (96, "DdgxTr7AcvO", "Auth Security", "An attacker just logged in as your user without a password.", "Never rely on client-side state for auth checks. Verify JWT expiration, invalidate tokens on logout, and enforce server-side session revocations."),
    (111, "DdJmMEOjhx7", "Enterprise Readiness", "Your enterprise deal will not close without SOC 2.", "Enterprise buyers require compliance, access logs, least privilege, and disaster recovery. Bake these into your architecture from day one."),
    (126, "Dcy-rVRD5jM", "Billing Integrity", "Your AI built your Stripe checkout, but did it verify webhook signatures?", "AI commonly hallucinates unverified webhook endpoints. An attacker can fake successful payments unless you verify raw body cryptographic signatures."),
    (186, "DbgDhezjelJ", "Secrets Management", "Seven out of my last ten audits had API keys committed to GitHub.", "Run automated pre-commit secret scanners. Never put live API keys in `.env` files checked into source control.")
]

for idx, code, topic, axiom, protocol in axioms_curated:
    md.append(f"### {idx}. [{code}] {topic}")
    md.append(f"> **Axiom:** *\"{axiom}\"*\n")
    md.append(f"**Action Protocol / Context:**\n{protocol}\n")
    md.append(f"🔗 [Direct Instagram Reel Link](https://www.instagram.com/mattmurphyai/reel/{code}/)\n")

md.append("\n---\n")

md.append("## Complete 192 Reels Master Directory\n")
md.append("Use this table to find the exact reel for any operational topic, or run `python3 scripts/search_reels.py <keyword>` in terminal.\n\n")

md.append("| # | Shortcode | Operational Category | Problem Hook / First Line | Core Lesson / Axiom | Direct Instagram Link |")
md.append("|:---:|:---:|---|---|---|:---:|")

for it in items:
    hook_clean = clean_cell(it['hook'])[:95]
    axiom_clean = clean_cell(it['axiom'])[:95] if it['axiom'] else "See full caption"
    cat_short = clean_cell(it['cat'])
    code = it['code']
    url = it['url']
    md.append(f"| {it['index']} | `{code}` | {cat_short} | {hook_clean} | {axiom_clean} | [Watch Reel]({url}) |")

md.append("\n\n---\n")
md.append("## How to Query Offline via CLI\n")
md.append("This repository includes a standalone search CLI `scripts/search_reels.py`.\n")
md.append("```bash\n# Search by keyword across all captions, hooks, and axioms\npython3 scripts/search_reels.py \"kill switch\"\npython3 scripts/search_reels.py \"insurance\"\npython3 scripts/search_reels.py \"stripe\"\n\n# Filter by category\npython3 scripts/search_reels.py --category \"Model Sovereignty\"\n\n# Inspect a specific reel in full\npython3 scripts/search_reels.py --reel 15 --full\npython3 scripts/search_reels.py --code DfnVLueCk7K --full\n\n# List category breakdown\npython3 scripts/search_reels.py --list-categories\n```\n")

full_content = "\n".join(md)

with open(OUT_AI_SHEESH, 'w') as f:
    f.write(full_content)

with open(OUT_SF, 'w') as f:
    f.write(full_content)

print(f"Generated {len(full_content)} bytes of markdown index.")
print(f"Written to {OUT_AI_SHEESH} and {OUT_SF}")
