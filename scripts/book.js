const path = require('path');
const { writeFile } = require('fs');
const fetchDouBanBooks = require('db-book').default;
const bookPath = path.join(__dirname, '../src/data/book.json');
const moviePath = path.join(__dirname, '../src/data/movie.json');

(async () => {
  const { book, movie } = await fetchDouBanBooks({
    userId: '84902716',
    headless: false,
  });
  writeFile(bookPath, JSON.stringify(book), async err => {
    if (err) console.log(err);
    console.log('Bingo: ' + book.length);
  });

  writeFile(moviePath, JSON.stringify(movie), async err => {
    if (err) console.log(err);
    console.log('Bingo: ' + book.length);
  });
})();
