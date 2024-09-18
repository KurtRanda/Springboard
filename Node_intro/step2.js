const fs = require('fs');
const process = require('process');
const axios = require('axios');

// Function to read and print the contents of a file
function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:`);
      console.error(err);
      process.exit(1); // Halts the script execution on error
    } else {
      console.log(data);
    }
  });
}

// Function to fetch and print the contents of a URL
async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.error(`Error fetching ${url}:  ${err}`);
    process.exit(1); // Halts the script execution on error
  }
}

// Get the argument from the command line
const input = process.argv[2];

// Check if an argument was provided
if (!input) {
  console.error("Please provide a file path or URL as an argument.");
  process.exit(1); // Halts script execution if no argument is provided
}

// Determine if the input is a URL or a file path
if (input.startsWith('http://') || input.startsWith('https://')) {
  webCat(input); // Fetch the content from the web
} else {
  cat(input); // Read the content from a file
}
