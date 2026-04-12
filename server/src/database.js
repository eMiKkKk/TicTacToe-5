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


export function getOrCreateUser(address) {
  return new Promise((resolve, reject) => {
    // Сначала пытаемся найти пользователя с таким адресом
    db.get(
      'SELECT wallet_address, wins, losses, draws FROM users WHERE wallet_address = ?',
      [address],
      (err, row) => {
        if (err) {
          reject(err); // Если ошибка запроса — отклоняем промис
          return;
        }

        if (row) {
          // Пользователь найден — возвращаем его данные
          resolve({
            wallet_address: row.wallet_address,
            wins: row.wins,
            losses: row.losses,
            draws: row.draws,
          });
        } else {
          // Пользователя нет — создаём нового
          db.run(
            'INSERT INTO users (wallet_address) VALUES (?)',
            [address],
            function(err) {
              if (err) {
                reject(err);
                return;
              }
              // После успешной вставки возвращаем нового пользователя с нулями
              resolve({
                wallet_address: address,
                wins: 0,
                losses: 0,
                draws: 0,
              });
            }
          );
        }
      }
    );
  });
}