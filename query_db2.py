import sqlite3
import json
import os

db_path = os.path.expanduser('~') + r'\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(db_path)
c = conn.cursor()

# Check message data structure
print("=== MESSAGE DATA SAMPLE (first user msg) ===")
c.execute("""
SELECT m.data FROM message m
WHERE json_extract(m.data, '$.role') = 'user'
AND m.session_id IN (SELECT id FROM session WHERE directory LIKE '%tea-website%')
LIMIT 3;
""")
for row in c.fetchall():
    print(row[0][:500])
    print('---')

# Check part data structure
print("\n=== PART DATA SAMPLE (text parts) ===")
c.execute("""
SELECT p.data FROM part p
JOIN message m ON p.message_id = m.id
WHERE m.session_id IN (SELECT id FROM session WHERE directory LIKE '%tea-website%')
AND json_extract(p.data, '$.type') = 'text'
LIMIT 3;
""")
for row in c.fetchall():
    print(row[0][:500])
    print('---')

# Find the actual content structure
print("\n=== MESSAGE KEYS (sample) ===")
c.execute("""
SELECT json_extract(m.data, '$.role'), m.data
FROM message m
WHERE m.session_id IN (SELECT id FROM session WHERE directory LIKE '%tea-website%')
AND json_extract(m.data, '$.role') = 'user'
LIMIT 5;
""")
for row in c.fetchall():
    print(f"role={row[0]}, keys={list(json.loads(row[1]).keys())}")
    d = json.loads(row[1])
    # Print all non-data fields
    for k, v in d.items():
        if k != 'data':
            print(f"  {k}: {str(v)[:200]}")
    print('---')

conn.close()
