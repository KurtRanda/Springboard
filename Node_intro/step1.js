const fs = require('fs');
const process = require('process');

// Function to read and print the contents of a file
function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1); // Halts the script execution on error
    } else {
      console.log(data);
    }
  });
}

// Get the path from the command line argument
const path = process.argv[2]; // Node passes command-line arguments in process.argv

// Check if a path was provided
if (!path) {
  console.error("Please provide a file path as an argument.");
  process.exit(1); // Halts script execution if no argument is provided
}
