const path = require('path');
const fs = require('fs');
const fetchDouBanBooks = require('db-book');
const config = require('./db-config');
const jsonPath = path.join(__dirname, '../src/pages/_data/books.json');

(async () => {
  const books = await fetchDouBanBooks({
    username: config.username,
    password: config.password,
    headless: false,
  });
  fs.writeFile(jsonPath, JSON.stringify(books), async err => {
    if (err) console.log(err);
    console.log('Bingo: ' + books.length);
    process.exit();
  });
})();
