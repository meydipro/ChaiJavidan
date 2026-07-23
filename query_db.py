import sqlite3
import json
import os

db_path = os.path.expanduser('~') + r'\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(db_path)
c = conn.cursor()

# 1. Search user messages for rules/preferences/decisions in tea-website sessions
print("=== USER MESSAGES: rules/decisions/preferences ===")
c.execute("""
SELECT m.id, m.session_id, substr(json_extract(m.data, '$.content'), 1, 400)
FROM message m
WHERE json_extract(m.data, '$.role') = 'user'
AND m.session_id IN (
  SELECT id FROM session WHERE directory LIKE '%tea-website%'
)
AND (
  json_extract(m.data, '$.content') LIKE '%always%'
  OR json_extract(m.data, '$.content') LIKE '%never%'
  OR json_extract(m.data, '$.content') LIKE '%remember%'
  OR json_extract(m.data, '$.content') LIKE '%rule%'
  OR json_extract(m.data, '$.content') LIKE '%decided%'
  OR json_extract(m.data, '$.content') LIKE '%deploy%'
  OR json_extract(m.data, '$.content') LIKE '%github%'
  OR json_extract(m.data, '$.content') LIKE '%push%'
  OR json_extract(m.data, '$.content') LIKE '%commit%'
)
ORDER BY m.time_created DESC
LIMIT 50;
""")
for row in c.fetchall():
    print(f'[session={row[1]}] {row[2]}')
    print('---')

# 2. Search for error/fix patterns
print("\n=== USER MESSAGES: errors/fixes/bugs ===")
c.execute("""
SELECT m.id, m.session_id, substr(json_extract(m.data, '$.content'), 1, 400)
FROM message m
WHERE json_extract(m.data, '$.role') = 'user'
AND m.session_id IN (
  SELECT id FROM session WHERE directory LIKE '%tea-website%'
)
AND (
  json_extract(m.data, '$.content') LIKE '%error%'
  OR json_extract(m.data, '$.content') LIKE '%fix%'
  OR json_extract(m.data, '$.content') LIKE '%bug%'
  OR json_extract(m.data, '$.content') LIKE '%not work%'
  OR json_extract(m.data, '$.content') LIKE '%broken%'
)
ORDER BY m.time_created DESC
LIMIT 30;
""")
for row in c.fetchall():
    print(f'[session={row[1]}] {row[2]}')
    print('---')

# 3. Get sessions with non-trivial assistant turns (code edits, etc.)
print("\n=== SESSION STATS ===")
c.execute("""
SELECT s.id, s.title, s.time_created,
  (SELECT COUNT(*) FROM message WHERE session_id = s.id) as msg_count
FROM session s
WHERE s.directory LIKE '%tea-website%'
ORDER BY s.time_created DESC
LIMIT 20;
""")
for row in c.fetchall():
    import datetime
    dt = datetime.datetime.fromtimestamp(row[2]/1000)
    print(f'{row[0]} | msgs={row[3]} | {dt.strftime("%Y-%m-%d %H:%M")} | {row[1][:80]}')

# 4. Search for repeated patterns across sessions (assistant findings about errors)
print("\n=== ASSISTANT FINDINGS: repeated error patterns ===")
c.execute("""
SELECT m.session_id, substr(json_extract(p.data, '$.text'), 1, 500) as txt
FROM part p
JOIN message m ON p.message_id = m.id
WHERE m.session_id IN (
  SELECT id FROM session WHERE directory LIKE '%tea-website%'
)
AND json_extract(m.data, '$.role') = 'assistant'
AND json_extract(p.data, '$.type') = 'text'
AND (
  json_extract(p.data, '$.text') LIKE '%authLimiter%'
  OR json_extract(p.data, '$.text') LIKE '%bcrypt%'
  OR json_extract(p.data, '$.text') LIKE '%JWT%'
  OR json_extract(p.data, '$.text') LIKE '%NODE_ENV%'
  OR json_extract(p.data, '$.text') LIKE '%CORS%'
)
ORDER BY m.time_created DESC
LIMIT 20;
""")
for row in c.fetchall():
    print(f'[session={row[0]}] {row[1][:300]}')
    print('---')

# 5. Check what changed in recent sessions (user prompts)
print("\n=== ALL USER MESSAGES (recent sessions) ===")
c.execute("""
SELECT m.session_id, substr(json_extract(m.data, '$.content'), 1, 300), m.time_created
FROM message m
WHERE json_extract(m.data, '$.role') = 'user'
AND m.session_id IN (
  SELECT id FROM session WHERE directory LIKE '%tea-website%'
  AND title != 'checkpoint-writer: Previous checkpoint: C:\\Users\\DiaKo System\\.local\\share\\mimocode\\memory\\sessions\\ses_0943726e2ffe32wpwFqHHnbtWo\\checkpoint.md\nPrevious memory: C:\\Users\\DiaKo System\\.local\\share\\mimocode\\memory\\projects\\b07ae15c-f657-40e0-a9ac-50740f32b8ff\\MEMORY.md\nRead BOTH the prior checkpoint (to dedupe Discovered/Dead-end titles AND to carry forward Live Resources, Execution-context frames, and Session-metadata fields that are still alive) AND the prior memory (project memory) before writing yours.'
)
ORDER BY m.time_created DESC
LIMIT 50;
""")
for row in c.fetchall():
    print(f'[{row[0]}] {row[1]}')
    print('---')

conn.close()
