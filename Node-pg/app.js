/** BizTime express application. */


const express = require("express");

const app = express();
const ExpressError = require("./expressError")
const companyRoutes = require('./routes/companies');
const invoiceRoutes = require('./routes/invoices'); 

// Middleware for parsing JSON bodies
app.use(express.json());

// Verify server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Use company and invoice routes 
app.use('/companies', companyRoutes);
app.use('/invoices', invoiceRoutes); 
/** 404 handler */

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});

// Start the server
app.listen(3000, function () {
  console.log('App on port 3000');
});

module.exports = app;
