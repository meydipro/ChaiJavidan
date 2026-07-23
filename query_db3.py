import sqlite3
import json
import os

db_path = os.path.expanduser('~') + r'\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(db_path)
c = conn.cursor()

# Find actual user text messages through parts
print("=== USER TEXT MESSAGES (through parts) ===")
c.execute("""
SELECT m.session_id, substr(json_extract(p.data, '$.text'), 1, 400)
FROM part p
JOIN message m ON p.message_id = m.id
WHERE m.session_id IN (SELECT id FROM session WHERE directory LIKE '%tea-website%')
AND json_extract(m.data, '$.role') = 'user'
AND json_extract(p.data, '$.type') = 'text'
AND m.session_id NOT LIKE 'ses_0b%' 
ORDER BY m.time_created DESC
LIMIT 50;
""")
for row in c.fetchall():
    print(f'[{row[0]}] {row[1]}')
    print('---')

# Also check all checkpoint-writer sessions to understand what happened in recent ones
print("\n=== RECENT SESSION TITLES (non-checkpoint) ===")
c.execute("""
SELECT s.id, s.title, s.time_created
FROM session s
WHERE s.directory LIKE '%tea-website%'
AND s.title NOT LIKE 'checkpoint-writer%'
AND s.title NOT LIKE 'Auto Dream%'
ORDER BY s.time_created DESC
LIMIT 15;
""")
import datetime
for row in c.fetchall():
    dt = datetime.datetime.fromtimestamp(row[2]/1000)
    print(f'{row[0]} | {dt.strftime("%Y-%m-%d %H:%M")} | {row[1][:100]}')

# Check if there are sessions with significant assistant work
print("\n=== SESSIONS WITH MOST ASSISTANT MESSAGES ===")
c.execute("""
SELECT s.id, s.title, s.time_created,
  (SELECT COUNT(*) FROM message WHERE session_id = s.id AND json_extract(data, '$.role') = 'assistant') as asst_msgs
FROM session s
WHERE s.directory LIKE '%tea-website%'
AND s.title NOT LIKE 'checkpoint-writer%'
ORDER BY asst_msgs DESC
LIMIT 10;
""")
for row in c.fetchall():
    dt = datetime.datetime.fromtimestamp(row[2]/1000)
    print(f'{row[0]} | asst_msgs={row[3]} | {dt.strftime("%Y-%m-%d %H:%M")} | {row[1][:80]}')

# Check the most recent non-checkpoint, non-dream session for user messages
print("\n=== LATEST REAL SESSION: USER MESSAGES ===")
c.execute("""
SELECT s.id, s.title FROM session s
WHERE s.directory LIKE '%tea-website%'
AND s.title NOT LIKE 'checkpoint-writer%'
AND s.title NOT LIKE 'Auto Dream%'
ORDER BY s.time_created DESC
LIMIT 1;
""")
latest = c.fetchone()
if latest:
    print(f"Latest session: {latest[0]} - {latest[1]}")
    c.execute("""
    SELECT substr(json_extract(p.data, '$.text'), 1, 500)
    FROM part p
    JOIN message m ON p.message_id = m.id
    WHERE m.session_id = ?
    AND json_extract(m.data, '$.role') = 'user'
    AND json_extract(p.data, '$.type') = 'text'
    ORDER BY m.time_created;
    """, (latest[0],))
    for row in c.fetchall():
        print(f'  USER: {row[0][:300]}')
        print('  ---')

conn.close()
