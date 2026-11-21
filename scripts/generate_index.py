import json
import re
import os

JSON_PATH = '/home/ruel/ai-sheesh/data/mattmurphy_192_reels.json'

with open(JSON_PATH, 'r') as f:
    raw_data = json.load(f)

print(f"Loaded {len(raw_data)} reels.")

def classify_reel(text):
    tl = text.lower()
    if any(k in tl for k in ['sandbox', 'kill switch', 'rogue', 'auto-approve', 'mcp server', 'commands on your machine', 'agent goes rogue', 'allowed commands', 'run commands']):
        return 'AI Agent Permissions & Sandboxing'
    elif any(k in tl for k in ['tenant', "customer's data", 'row-level', 'first paying customer can see', 'shared tables', 'separation']):
        return 'Multi-Tenancy & Data Security'
    elif any(k in tl for k in ['insur', 'underwriter', 'compliance', 'audit', 'regulator', 'sue', 'lawsuit', 'subpoena', 'board', 'liability', 'sec', 'fines']):
        return 'Insurance, Audits & Board Governance'
    elif any(k in tl for k in ['equity', 'bootstrapping', 'investor', 'nobody is paying you', 'pricing', 'charge', 'contract', 'first customer', 'paying customer', 'wharton', 'venture']):
        return 'Bootstrapping, Client Equity & Deals'
    elif any(k in tl for k in ['open weight', 'weights', 'hugging face', 'sovereign', 'went dark', 'download your ai models', 'own the files', 'registry', 'ollama', 'local ai']):
        return 'Model Sovereignty & Local AI Hosting'
    elif any(k in tl for k in ['staff', 'personal account', 'employees', 'shadow', 'laptop', 'who signs for it', 'work on their personal']):
        return 'Shadow AI & Team Governance'
    elif any(k in tl for k in ['vibe', 'eighty percent', 'prompt', 'clean up', 'prototype', 'rebuilt his ai setup', 'looks finished', 'production', 'test', 'docker', 'terminal', 'git', 'linting', 'two million lines']):
        return 'Vibe-Coding Hardening & The 20% Production Gap'
    else:
        return 'Operator Mindset & Business Strategy'

processed = []
for idx, item in enumerate(raw_data, 1):
    summary = item.get('summary', '').strip()
    code = item.get('code', '')
    url = item.get('url', f'https://www.instagram.com/mattmurphyai/reel/{code}/')
    
    # First sentence / hook
    first_line = summary.split('\n')[0].strip()
    # Clean hook of double punctuation
    first_sent = first_line.split('. ')[0] if '. ' in first_line else first_line
    if not first_sent.endswith(('.', '!', '?')):
        first_sent += '.'
        
    # Extract axiom (line immediately before -MM or closing line)
    parts = summary.split('-MM')
    axiom = ""
    if len(parts) > 1:
        lines = [l.strip() for l in parts[0].split('\n') if l.strip()]
        if lines:
            axiom = lines[-1]
            
    # Category
    category = classify_reel(summary)
    
    # Check for numbered points (One. Two. Three.)
    steps = []
    step_pattern = re.findall(r'(One\..*?)(?=Two\.|$)|(Two\..*?)(?=Three\.|$)|(Three\..*?)(?=\n\n|$)', summary, re.DOTALL)
    # Also simple extraction if One. Two. Three. in text
    if 'One.' in summary and 'Two.' in summary:
        m = re.search(r'One\.\s*(.*?)\s*Two\.\s*(.*?)(?:\s*Three\.\s*(.*?))?(?:\n\n|\Z)', summary, re.DOTALL)
        if m:
            s1 = m.group(1).strip()
            s2 = m.group(2).strip()
            s3 = m.group(3).strip() if m.group(3) else ""
            steps = [s1, s2, s3]
            
    processed.append({
        'index': idx,
        'code': code,
        'url': url,
        'category': category,
        'hook': first_sent,
        'axiom': axiom,
        'steps': steps,
        'full_text': summary
    })

print(f"Processed {len(processed)} reels successfully.")

# Count by category
cat_counts = {}
for p in processed:
    cat_counts[p['category']] = cat_counts.get(p['category'], 0) + 1

for c, count in sorted(cat_counts.items(), key=lambda x: -x[1]):
    print(f"  {c}: {count}")

