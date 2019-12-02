const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto('https://github.com/coderfe');

  await page.setViewport({ width: 1920, height: 942 });

  await page.waitForSelector(
    '.js-calendar-graph > .js-calendar-graph-svg > g > g:nth-child(6) > .day:nth-child(3)'
  );
  const data = await page.$$eval('.day', els => {
    return els.map(el => ({
      commits: Number(el.getAttribute('data-count')),
      date: el.getAttribute('data-date').match(/\d{4}-\d{2}/g)[0],
    }));
  });

  await save(data);

  await browser.close();
})();

async function save(data) {
  data = data.filter(item => item.date > `${new Date().getFullYear() - 1}-12`);
  const months = Array.from(new Set(data.map(item => item.date)));

  const _data = months.map(month => {
    return {
      month,
      commits: data
        .filter(item => item.date === month)
        .map(item => item.commits)
        .reduce((prev, acc) => prev + acc, 0),
    };
  });

  return new Promise(resolve => {
    fs.writeFile(
      path.resolve(__dirname, '..', 'src/data/github.json'),
      JSON.stringify(_data),
      { encoding: 'utf-8' },
      err => {
        if (err) {
          throw err;
        }
        resolve();
        console.log('Done');
      }
    );
  });
}
