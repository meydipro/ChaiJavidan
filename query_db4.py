import sqlite3
import json
import os

db_path = os.path.expanduser('~') + r'\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(db_path)
c = conn.cursor()

# Check the latest real session for important assistant findings
print("=== LATEST SESSION (ses_0943726e) ASSISTANT TEXT FINDINGS ===")
c.execute("""
SELECT substr(json_extract(p.data, '$.text'), 1, 600)
FROM part p
JOIN message m ON p.message_id = m.id
WHERE m.session_id = 'ses_0943726e2ffe32wpwFqHHnbtWo'
AND json_extract(m.data, '$.role') = 'assistant'
AND json_extract(p.data, '$.type') = 'text'
AND (
  json_extract(p.data, '$.text') LIKE '%fix%'
  OR json_extract(p.data, '$.text') LIKE '%found%'
  OR json_extract(p.data, '$.text') LIKE '%deploy%'
  OR json_extract(p.data, '$.text') LIKE '%issue%'
  OR json_extract(p.data, '$.text') LIKE '%solution%'
  OR json_extract(p.data, '$.text') LIKE '%workaround%'
  OR json_extract(p.data, '$.text') LIKE '%PAT%'
  OR json_extract(p.data, '$.text') LIKE '%credential%'
  OR json_extract(p.data, '$.text') LIKE '%push%'
  OR json_extract(p.data, '$.text') LIKE '%render%'
  OR json_extract(p.data, '$.text') LIKE '%action%'
)
ORDER BY m.time_created
LIMIT 30;
""")
for row in c.fetchall():
    print(row[0])
    print('---')

# Check for the latest session's user messages that show what was fixed
print("\n=== LATEST SESSION: ALL USER MESSAGES ===")
c.execute("""
SELECT substr(json_extract(p.data, '$.text'), 1, 500)
FROM part p
JOIN message m ON p.message_id = m.id
WHERE m.session_id = 'ses_0943726e2ffe32wpwFqHHnbtWo'
AND json_extract(m.data, '$.role') = 'user'
AND json_extract(p.data, '$.type') = 'text'
ORDER BY m.time_created;
""")
for row in c.fetchall():
    print(row[0][:300])
    print('---')

# Check the "apply logo color palette" session
print("\n=== LOGO COLOR SESSION (ses_0a8e62fc) USER MESSAGES ===")
c.execute("""
SELECT substr(json_extract(p.data, '$.text'), 1, 500)
FROM part p
JOIN message m ON p.message_id = m.id
WHERE m.session_id = 'ses_0a8e62fc1ffe3UmwKgPzPjCxR1'
AND json_extract(m.data, '$.role') = 'user'
AND json_extract(p.data, '$.type') = 'text'
ORDER BY m.time_created;
""")
for row in c.fetchall():
    print(row[0][:300])
    print('---')

# Check the GitHub commit session
print("\n=== GITHUB COMMIT SESSION (ses_0ad94dbe) USER MESSAGES ===")
c.execute("""
SELECT substr(json_extract(p.data, '$.text'), 1, 500)
FROM part p
JOIN message m ON p.message_id = m.id
WHERE m.session_id = 'ses_0ad94dbefffeeO66cztMMGSx4O'
AND json_extract(m.data, '$.role') = 'user'
AND json_extract(p.data, '$.type') = 'text'
ORDER BY m.time_created;
""")
for row in c.fetchall():
    print(row[0][:300])
    print('---')

# Check what the password reset session did
print("\n=== PASSWORD RESET SESSION (ses_0b45a17e) FINDINGS ===")
c.execute("""
SELECT substr(json_extract(p.data, '$.text'), 1, 600)
FROM part p
JOIN message m ON p.message_id = m.id
WHERE m.session_id = 'ses_0b45a17ebffe95Sc3H3Flwei86'
AND json_extract(m.data, '$.role') = 'assistant'
AND json_extract(p.data, '$.type') = 'text'
AND (
  json_extract(p.data, '$.text') LIKE '%password%'
  OR json_extract(p.data, '$.text') LIKE '%forgot%'
  OR json_extract(p.data, '$.text') LIKE '%reset%'
  OR json_extract(p.data, '$.text') LIKE '%bcrypt%'
)
ORDER BY m.time_created
LIMIT 20;
""")
for row in c.fetchall():
    print(row[0][:400])
    print('---')

conn.close()
