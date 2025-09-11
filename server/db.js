// db.js — opens/initializes SQLite DB
const Database = require('better-sqlite3');
const path = require('path');
const dbPath = process.env.DB_PATH || path.join(__dirname, 'db.sqlite3');
const db = new Database(dbPath);
module.exports = db;
