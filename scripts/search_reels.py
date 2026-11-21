#!/usr/bin/env python3
"""
Matt Murphy (@mattmurphyai) 192 Reels Search & Knowledge CLI
Fast offline query tool for all 192 reels, protocols, axioms, and links.
"""

import sys
import json
import re
import argparse
from pathlib import Path

# Locate dataset
CURRENT_DIR = Path(__file__).resolve().parent
REPO_ROOT = CURRENT_DIR.parent
DATA_PATH = REPO_ROOT / "data" / "mattmurphy_192_reels.json"

if not DATA_PATH.exists():
    # Fallback to alternate repo or /mnt/c
    alt_paths = [
        Path("/home/ruel/software-factory/data/mattmurphy_192_reels.json"),
        Path("/mnt/c/Users/User/Downloads/mattmurphy_403_reels.json")
    ]
    for p in alt_paths:
        if p.exists():
            DATA_PATH = p
            break

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

def extract_meta(item, index):
    text = item.get("summary", "").strip()
    code = item.get("code", "")
    url = item.get("url", f"https://www.instagram.com/mattmurphyai/reel/{code}/")
    
    first_line = text.split("\n")[0].strip()
    first_sent = first_line.split(". ")[0] if ". " in first_line else first_line
    if not first_sent.endswith((".", "!", "?")):
        first_sent += "."
        
    parts = text.split("-MM")
    axiom = ""
    if len(parts) > 1:
        lines = [l.strip() for l in parts[0].split("\n") if l.strip()]
        if lines:
            axiom = lines[-1]
            
    category = classify(text)
    
    return {
        "index": index,
        "code": code,
        "url": url,
        "first_sent": first_sent,
        "axiom": axiom,
        "category": category,
        "full_text": text
    }

def print_reel(reel, full=False):
    idx = reel["index"]
    code = reel["code"]
    url = reel["url"]
    cat = reel["category"]
    hook = reel["first_sent"]
    axiom = reel["axiom"]
    
    print(f"\033[1;36m[Reel #{idx} | {code}]\033[0m \033[1;33m[{cat}]\033[0m")
    print(f"\033[1;37mHook:\033[0m  {hook}")
    if axiom:
        print(f"\033[1;32mAxiom:\033[0m \"{axiom}\"")
    print(f"\033[1;34mLink:\033[0m  {url}")
    
    if full:
        print("\n\033[1;30m--- Full Caption ---\033[0m")
        print(reel["full_text"])
        print("\033[1;30m--------------------\033[0m")
    print("-" * 70)

def main():
    parser = argparse.ArgumentParser(description="Search Matt Murphy's 192 Reels Archive")
    parser.add_argument("query", nargs="?", default="", help="Keyword to search in hooks, captions, and axioms")
    parser.add_argument("--category", "-c", help="Filter by topic category substring")
    parser.add_argument("--reel", "-r", type=int, help="View specific reel by number (1-192)")
    parser.add_argument("--code", help="View specific reel by Instagram shortcode (e.g. DfnVLueCk7K)")
    parser.add_argument("--full", "-f", action="store_true", help="Print full caption text")
    parser.add_argument("--list-categories", "-l", action="store_true", help="List all categories with reel counts")
    args = parser.parse_args()

    if not DATA_PATH.exists():
        print(f"Error: Dataset not found at {DATA_PATH}")
        sys.exit(1)

    with open(DATA_PATH, "r") as f:
        raw = json.load(f)

    reels = [extract_meta(item, i + 1) for i, item in enumerate(raw)]

    if args.list_categories:
        counts = {}
        for r in reels:
            c = r["category"]
            counts[c] = counts.get(c, 0) + 1
        print("\n\033[1;37m=== 192 Reels by Category ===\033[0m")
        for cat, cnt in sorted(counts.items(), key=lambda x: -x[1]):
            print(f"  • {cat:48s}: {cnt:2d} reels")
        print()
        return

    if args.reel:
        if 1 <= args.reel <= len(reels):
            print_reel(reels[args.reel - 1], full=True)
            return
        else:
            print(f"Error: Reel number must be between 1 and {len(reels)}")
            return

    if args.code:
        matched = [r for r in reels if r["code"].lower() == args.code.lower()]
        if matched:
            for r in matched:
                print_reel(r, full=True)
            return
        else:
            print(f"No reel found matching code '{args.code}'")
            return

    q = args.query.lower().strip()
    cat_filter = args.category.lower().strip() if args.category else ""

    results = []
    for r in reels:
        if cat_filter and cat_filter not in r["category"].lower():
            continue
        if q:
            match_text = f"{r['first_sent']} {r['axiom']} {r['full_text']} {r['category']}".lower()
            if q in match_text:
                results.append(r)
        else:
            results.append(r)

    print(f"\nFound {len(results)} matching reels" + (f" for '{q}'" if q else "") + (f" in category '{args.category}'" if args.category else "") + ":\n")
    for r in results:
        print_reel(r, full=args.full)

if __name__ == "__main__":
    main()
