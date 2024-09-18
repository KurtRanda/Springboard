/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

/** Generate Markov text from file or URL */

function generateText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

/** Read file and generate text */

function makeTextFromFile(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

/** Read URL and generate text */

async function makeTextFromURL(url) {
  try {
    let resp = await axios.get(url);
    generateText(resp.data);
  } catch (err) {
    console.error(`Error fetching URL ${url}: ${err}`);
    process.exit(1);
  }
}

/** Main logic to handle input */

let [method, path] = process.argv.slice(2);

if (method === 'file') {
  makeTextFromFile(path);
} else if (method === 'url') {
  makeTextFromURL(path);
} else {
  console.error(`Unknown method: ${method}`);
  console.error('Usage: node makeText.js file <path-to-file> or url <url>');
  process.exit(1);
}


