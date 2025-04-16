// db.js - Persistência simples de sessões usando SQLite
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;

export async function getDB() {
  if (!db) {
    db = await open({
      filename: './chatbot_sessions.sqlite',
      driver: sqlite3.Database
    });
    await db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        sessionId TEXT PRIMARY KEY,
        state TEXT
      )
    `);
  }
  return db;
}

export async function saveState(sessionId, state) {
  const db = await getDB();
  await db.run(
    'INSERT OR REPLACE INTO sessions (sessionId, state) VALUES (?, ?)',
    sessionId,
    JSON.stringify(state)
  );
}

export async function loadState(sessionId) {
  const db = await getDB();
  const row = await db.get('SELECT state FROM sessions WHERE sessionId = ?', sessionId);
  if (row && row.state) {
    return JSON.parse(row.state);
  }
  return null;
}
