/** Database setup for BizTime. */
const { Client } = require('pg');

// Create a new client instance and connect to your 'biztime' database
const client = new Client({
  connectionString: 'postgresql://kurt:mysecretpassword@localhost/biztime'  // assuming default settings
});

client.connect();

// Export the client object for use in other parts of your project
module.exports = client;

