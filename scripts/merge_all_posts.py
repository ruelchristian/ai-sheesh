#!/usr/bin/env python3
"""
Merge script for Matt Murphy 192 Reels + Main Profile Posts (~403 total posts).
Merges mattmurphy_192_reels.json and mattmurphy_all_posts.json, de-duplicating by code.
"""

import json
from pathlib import Path

REELS_PATH = Path('/home/ruel/ai-sheesh/data/mattmurphy_192_reels.json')
DOWNLOADS_PATH = Path('/mnt/c/Users/User/Downloads/mattmurphy_all_posts.json')
ALT_PATH = Path('/home/ruel/ai-sheesh/data/mattmurphy_all_posts.json')
OUT_PATH = Path('/home/ruel/ai-sheesh/data/mattmurphy_complete_archive.json')

all_posts_path = DOWNLOADS_PATH if DOWNLOADS_PATH.exists() else ALT_PATH

records = {}

# 1. Load existing 192 reels
if REELS_PATH.exists():
    with open(REELS_PATH, 'r') as f:
        reels_data = json.load(f)
    for r in reels_data:
        code = r.get('code')
        if code:
            records[code] = {
                'code': code,
                'url': r.get('url', f"https://www.instagram.com/mattmurphyai/reel/{code}/"),
                'type': 'reel',
                'summary': r.get('summary', '')
            }
    print(f"Loaded {len(records)} existing reels from {REELS_PATH.name}")

# 2. Merge new posts from main profile harvest
if all_posts_path.exists():
    with open(all_posts_path, 'r') as f:
        posts_data = json.load(f)
    added_count = 0
    updated_count = 0
    for p in posts_data:
        code = p.get('code')
        if not code:
            continue
        if code in records:
            # Update summary if longer/richer
            if len(p.get('summary', '')) > len(records[code]['summary']):
                records[code]['summary'] = p.get('summary')
            if 'type' in p:
                records[code]['type'] = p['type']
            updated_count += 1
        else:
            records[code] = {
                'code': code,
                'url': p.get('url', f"https://www.instagram.com/mattmurphyai/p/{code}/"),
                'type': p.get('type', 'post'),
                'summary': p.get('summary', '')
            }
            added_count += 1
    print(f"Processed {len(posts_data)} posts from {all_posts_path.name}: {added_count} new posts added, {updated_count} existing updated.")
else:
    print(f"Waiting for {all_posts_path} to be downloaded...")

total_list = list(records.values())
print(f"Total unified items: {len(total_list)}")

if len(total_list) > 0:
    with open(OUT_PATH, 'w') as f:
        json.dump(total_list, f, indent=2)
    print(f"Saved complete unified archive to {OUT_PATH}")
