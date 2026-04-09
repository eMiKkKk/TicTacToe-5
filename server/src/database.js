import sqlite3 from 'sqlite3';

let db = new sqlite3.Database('./server/db/stats.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('подключено');
});


db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (wallet_address TEXT PRIMARY KEY, wins INTEGER DEFAULT 0, losses INTEGER DEFAULT 0, draws INTEGER DEFAULT 0)');
  db.run('CREATE TABLE IF NOT EXISTS matches (id INTEGER PRIMARY KEY, player1 TEXT, player2 TEXT, winner TEXT, date TIMESTAMP)');
})

console.log(db);