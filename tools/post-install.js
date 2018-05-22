// Node libs
let fs = require('fs');
let util = require('util');
let path = require('path');

// Async
const exists = util.promisify(fs.exists);
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

// Load external messages
let banner = fs.readFileSync('./src/assets/text/banner.txt', 'utf8');
let intro = fs.readFileSync('./src/assets/text/getting-started.txt', 'utf8');

let giveAwayDataPath = path.join(__dirname, '../data/giveAwaysData.json');
let giveAwayDataContainerPath = path.dirname(giveAwayDataPath);

(async () => {
  // 'Touch' giveAwaysData.json to prevent missing file errors on first load
  let gaExists = await exists(giveAwayDataPath);

  if (!gaExists) {
    if (!await exists(giveAwayDataContainerPath)) {
      await mkdir(giveAwayDataContainerPath);
    }

    await writeFile(giveAwayDataPath, '{}', { encoding: 'utf8' });
  }

  // Clear the console
  console.log('\x1Bc');

  // Print the banner
  console.log(`${banner}\n`);

  // Print copyright information
  console.log(`GameMakerBot v${require('../../package.json').version}`);
  console.log('Copyright © 2018 Chris "topherlicious" Anselmo & Contributors\nThis program comes with ABSOLUTELY NO WARRANTY.\n');

  // Print getting started information
  console.log(`${intro}\n`);
})();
