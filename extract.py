import urllib.request
import re
import json

url = 'https://docs.google.com/forms/d/1odhEUevxe6l1IRCVjtstJBn7bXE8bhDL_moHWsrbYJc/viewform'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8')
    
    with open('extracted_entries.txt', 'w', encoding='utf-8') as out:
        out.write(f"HTML length: {len(html)}\n")
        
        action_match = re.search(r'action="(.*?formResponse)"', html)
        if action_match:
            out.write(f"Form Action URL: {action_match.group(1)}\n")
            
        data_match = re.search(r'FB_PUBLIC_LOAD_DATA_\s*=\s*(.*?);</script>', html, re.DOTALL)
        if data_match:
            data_str = data_match.group(1)
            data = json.loads(data_str)
            questions = data[1][1]
            out.write(f"Found {len(questions)} questions:\n")
            for q in questions:
                if q:
                    q_id = q[0]
                    q_title = q[1]
                    q_entry = q[4][0][0] if (len(q) > 4 and q[4] and len(q[4][0]) > 0) else 'N/A'
                    out.write(f" - Title: '{q_title}' | Entry ID: entry.{q_entry}\n")
