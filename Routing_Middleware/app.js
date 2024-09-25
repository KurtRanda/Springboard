const express = require("express")
const app = express();
const itemsRoutes = require("./routes/items")
const ExpressError = require("./expressError")

app.use(express.json());
app.use("/items", itemsRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to the Shopping List API! Use /items to view the list.");
  });
  
/** 404 handler */
app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});


/** general error handler */
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
module.exports = app