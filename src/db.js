import initSqlJs from 'sql.js';

let db;

async function initializeDB() {
  const SQL = await initSqlJs();
  db = new SQL.Database();
  db.run(`
    CREATE TABLE drivers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      phone TEXT,
      car_model TEXT,
      car_number TEXT
    )
  `);
}

initializeDB();

export default db;
