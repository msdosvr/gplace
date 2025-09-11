require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db');
const { migrate } = require('./migrations');

const PORT = process.env.PORT || 3000;

migrate();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// --- API endpoints (CRUD for places) ---

app.get('/api/places', (req, res) => {
  const rows = db.prepare('SELECT * FROM places ORDER BY created_at DESC').all();
  res.json(rows);
});

app.get('/api/places/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM places WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

app.post('/api/places', (req, res) => {
  const { title, description, lat, lng } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  const stmt = db.prepare('INSERT INTO places (title, description, lat, lng) VALUES (?, ?, ?, ?)');
  const info = stmt.run(title, description || '', lat || null, lng || null);
  const created = db.prepare('SELECT * FROM places WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(created);
});

app.put('/api/places/:id', (req, res) => {
  const { title, description, lat, lng } = req.body;
  const id = req.params.id;
  const stmt = db.prepare('UPDATE places SET title = ?, description = ?, lat = ?, lng = ? WHERE id = ?');
  const info = stmt.run(title, description || '', lat || null, lng || null, id);
  if (info.changes === 0) return res.status(404).json({ error: 'Not found' });
  const updated = db.prepare('SELECT * FROM places WHERE id = ?').get(id);
  res.json(updated);
});

app.delete('/api/places/:id', (req, res) => {
  const id = req.params.id;
  const info = db.prepare('DELETE FROM places WHERE id = ?').run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

app.get('*', (req, res) => {
  const index = path.join(__dirname, '..', 'frontend', 'index.html');
  res.sendFile(index);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
