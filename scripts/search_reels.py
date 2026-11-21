#!/usr/bin/env python3
"""
Matt Murphy (@mattmurphyai) 405 Posts & Reels Master Search CLI
Offline query tool for all 405 posts, reels, the 13 tech stack layers, and axioms.
"""

import sys
import json
import re
import argparse
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
REPO_ROOT = CURRENT_DIR.parent
DATA_PATH = REPO_ROOT / "data" / "mattmurphy_complete_405_archive.json"

if not DATA_PATH.exists():
    alt_paths = [
        Path("/home/ruel/software-factory/data/mattmurphy_complete_405_archive.json"),
        Path("/home/ruel/ai-sheesh/data/mattmurphy_complete_archive.json"),
        Path("/home/ruel/ai-sheesh/data/mattmurphy_192_reels.json")
    ]
    for p in alt_paths:
        if p.exists():
            DATA_PATH = p
            break

CATEGORIES = [
    ("The 13-Layer Tech Stack Architecture", [
        "tech stack layer", "layer 13 of 13", "layer 12", "layer 11 of 13", 
        "layer 10 of 13", "layer 9 of 13", "layer 8 of 13", "layer 6 of 13", 
        "layer 5 of 13", "day 7 of 13", "day 4 of 13", "day 3 of 13", "day 2 of 13", 
        "day one of 13", "tech stack recap", "full-stack means frontend and backend"
    ]),
    ("AI Security, Sandboxing & Kill Switches", [
        "sandbox", "kill switch", "rogue", "auto-approve", "allowed commands", 
        "run commands", "container", "mcp server", "keys and log", "agent goes rogue", 
        "cve", "vuln"
    ]),
    ("Multi-Tenancy, Auth & Data Leaks", [
        "tenant", "customer's data", "row-level", "first paying customer can see", 
        "shared tables", "separation", "logged in as your user", "session", "jwt", 
        "password", "without a password", "auth", "rbac", "trust layer", "can user a see"
    ]),
    ("API Keys, Secrets & Infrastructure Failures", [
        "api key", "github", "committed to github", "webhook", "stripe checkout", 
        "env", "secret", "credentials", "rented server", "outage", "cascade", "failed", 
        "downtime", "stole their money", "gateway", "caching", "sentry", "error tracking"
    ]),
    ("Insurance, SOC 2, Audits & Legal Liability", [
        "insur", "underwriter", "soc 2", "compliance", "audit", "regulator", 
        "subpoena", "lawsuit", "sue", "board", "liability", "sec", "fine", "attorney"
    ]),
    ("Model Sovereignty & Local AI Infrastructure", [
        "open weight", "weights", "hugging face", "sovereign", "went dark", 
        "download your ai models", "own the files", "registry", "ollama", "local ai", 
        "big ai", "jensen", "hardware to buy", "bedrock"
    ]),
    ("Shadow AI & Team Governance", [
        "staff", "personal account", "employees", "shadow", "laptop", 
        "who signs for it", "personal phones", "two billion", "allow all"
    ]),
    ("Founder Bootstrapping, Client Equity & Cash Flow", [
        "equity", "bootstrapping", "investor", "nobody is paying you", "pricing", 
        "charge", "contract", "first customer", "paying customer", "wharton", "vc", 
        "form adv", "raise money", "pitch", "big meeting", "cursor hit"
    ]),
    ("Vibe Coding Hardening & The 20% Production Gap", [
        "vibe", "eighty percent", "prompt", "clean up", "prototype", 
        "rebuilt his ai setup", "looks finished", "two million lines", "production", 
        "linting", "one check script", "architecture", "cisco", "weekend", "demo"
    ]),
    ("Operator Mindset & Commercializing Internal Tools", [
        "operator", "wholesale", "strangers", "sell it", "10,000 business owners", 
        "nobody came", "salesforce", "landlords", "workflows count money", "cta", "fleet", 
        "faction"
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
    if len(parts) == 1:
        parts = text.split("- MM")
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
        "type": item.get("type", "reel"),
        "full_text": text
    }

def print_post(post, full=False):
    idx = post["index"]
    code = post["code"]
    url = post["url"]
    cat = post["category"]
    hook = post["first_sent"]
    axiom = post["axiom"]
    ptype = post.get("type", "reel")
    
    print(f"\033[1;36m[Post #{idx} | {code}]\033[0m \033[1;35m[{ptype.upper()}]\033[0m \033[1;33m[{cat}]\033[0m")
    print(f"\033[1;37mHook:\033[0m  {hook}")
    if axiom:
        print(f"\033[1;32mAxiom:\033[0m \"{axiom}\"")
    print(f"\033[1;34mLink:\033[0m  {url}")
    
    if full:
        print("\n\033[1;30m--- Full Caption ---\033[0m")
        print(post["full_text"])
        print("\033[1;30m--------------------\033[0m")
    print("-" * 72)

def main():
    parser = argparse.ArgumentParser(description="Search Matt Murphy's 405 Posts & Reels Master Archive")
    parser.add_argument("query", nargs="?", default="", help="Keyword to search in hooks, captions, and axioms")
    parser.add_argument("--category", "-c", help="Filter by topic category substring")
    parser.add_argument("--layer", "-l", type=int, help="View specific Tech Stack Layer (1-13)")
    parser.add_argument("--post", "-p", type=int, help="View specific post by number (1-405)")
    parser.add_argument("--code", help="View specific post by shortcode (e.g. DYchN42gIoy)")
    parser.add_argument("--full", "-f", action="store_true", help="Print full caption text")
    parser.add_argument("--list-categories", action="store_true", help="List all categories with post counts")
    args = parser.parse_args()

    if not DATA_PATH.exists():
        print(f"Error: Dataset not found at {DATA_PATH}")
        sys.exit(1)

    with open(DATA_PATH, "r") as f:
        raw = json.load(f)

    posts = [extract_meta(item, i + 1) for i, item in enumerate(raw)]

    if args.list_categories:
        counts = {}
        for r in posts:
            c = r["category"]
            counts[c] = counts.get(c, 0) + 1
        print(f"\n\033[1;37m=== Matt Murphy Master Archive: 405 Posts by Category ===\033[0m")
        for cat, cnt in sorted(counts.items(), key=lambda x: -x[1]):
            print(f"  • {cat:48s}: {cnt:3d} posts")
        print()
        return

    if args.layer:
        if 1 <= args.layer <= 13:
            layer_map = {
                1: "DYfZI0qx9xF",
                2: "DYiSfwGP2D9",
                3: "DYklzbex7me",
                4: "DYnJUm9xKMN",
                5: "DYpc9DkghA8",
                6: "DYsVm3PvLih",
                7: "DYuyZmkRXye",
                8: "DYxb9K-RC7n",
                9: "DYz-1mDxTXN",
                10: "DY2nroEvto_",
                11: "DY5KQSsRpfz",
                12: "DY7iptdRsB0",
                13: "DY-UCtORgDS"
            }
            target_code = layer_map.get(args.layer)
            matched = [p for p in posts if p["code"] == target_code]
            if matched:
                print(f"\n\033[1;32m=== TECH STACK LAYER {args.layer} OF 13 ===\033[0m\n")
                print_post(matched[0], full=True)
                return
        else:
            print("Error: Layer must be between 1 and 13")
            return

    if args.post:
        if 1 <= args.post <= len(posts):
            print_post(posts[args.post - 1], full=True)
            return
        else:
            print(f"Error: Post number must be between 1 and {len(posts)}")
            return

    if args.code:
        matched = [r for r in posts if r["code"].lower() == args.code.lower()]
        if matched:
            for r in matched:
                print_post(r, full=True)
            return
        else:
            print(f"No post found matching code '{args.code}'")
            return

    q = args.query.lower().strip()
    cat_filter = args.category.lower().strip() if args.category else ""

    results = []
    for r in posts:
        if cat_filter and cat_filter not in r["category"].lower():
            continue
        if q:
            match_text = f"{r['first_sent']} {r['axiom']} {r['full_text']} {r['category']}".lower()
            if q in match_text:
                results.append(r)
        else:
            results.append(r)

    print(f"\nFound {len(results)} matching posts" + (f" for '{q}'" if q else "") + (f" in category '{args.category}'" if args.category else "") + f" (out of {len(posts)} total):\n")
    for r in results:
        print_post(r, full=args.full)

if __name__ == "__main__":
    main()
