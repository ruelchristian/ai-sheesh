import json
import re

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
    # return category with highest match count
    return max(scores.items(), key=lambda x: x[1])[0]

with open('/home/ruel/ai-sheesh/data/mattmurphy_192_reels.json', 'r') as f:
    data = json.load(f)

cat_counts = {}
for d in data:
    cat = classify(d['summary'])
    cat_counts[cat] = cat_counts.get(cat, 0) + 1

for c, count in sorted(cat_counts.items(), key=lambda x: -x[1]):
    print(f"{c:50s}: {count:2d} reels")
