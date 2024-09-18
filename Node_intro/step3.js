const fs = require('fs');
const process = require('process');
const axios = require('axios');

// Helper function to handle writing to a file
function writeToFile(outputFile, data) {
  fs.writeFile(outputFile, data, 'utf8', (err) => {
    if (err) {
      console.error(`Couldn't write to ${outputFile}:`);
      console.error(err);
      process.exit(1); // Halts script execution on error
    }
  });
}

// Function to read and either print or write the contents of a file
function cat(path, outputFile = null) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:`);
      console.error(err);
      process.exit(1);
    } else {
      if (outputFile) {
        writeToFile(outputFile, data); // Write to the file if outputFile is provided
      } else {
        console.log(data); // Otherwise, print to the console
      }
    }
  });
}

// Function to fetch and either print or write the contents of a URL
async function webCat(url, outputFile = null) {
  try {
    const response = await axios.get(url);
    if (outputFile) {
      writeToFile(outputFile, response.data); // Write to the file if outputFile is provided
    } else {
      console.log(response.data); // Otherwise, print to the console
    }
  } catch (err) {
    console.error(`Error fetching ${url}:`);
    console.error(err);
    process.exit(1);
  }
}

// Main logic to handle the command line arguments
function handleInput() {
  let outputFile = null;
  let pathOrUrl = null;

  // Check if the --out flag is provided
  if (process.argv[2] === '--out') {
    outputFile = process.argv[3]; // Output filename is the argument after --out
    pathOrUrl = process.argv[4];  // File path or URL is the argument after the output filename
  } else {
    pathOrUrl = process.argv[2];  // If --out isn't provided, the file path or URL is the second argument
  }

  // Ensure a path or URL is provided
  if (!pathOrUrl) {
    console.error("Please provide a file path or URL as an argument.");
    process.exit(1);
  }

  // Determine if the input is a URL or file path and call the appropriate function
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    webCat(pathOrUrl, outputFile); // Handle URL
  } else {
    cat(pathOrUrl, outputFile); // Handle file
  }
}

// Execute the main function
handleInput();
