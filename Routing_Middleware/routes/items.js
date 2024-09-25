const express = require("express");
const router = new express.Router();
const items = require("../fakeDb");
const ExpressError = require("../expressError");

// GET /items - Retrieve all items
router.get("/", (req, res) => {
  return res.json(items);
});

// POST /items - Add an item to the list
router.post("/", (req, res, next) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) throw new ExpressError("Name and price are required", 400);

    const newItem = { name, price };
    items.push(newItem);
    return res.status(201).json({ added: newItem });
  } catch (err) {
    return next(err);
  }
});

// GET /items/:name - Retrieve a single item by name
router.get("/:name", (req, res, next) => {
  const item = items.find(i => i.name === req.params.name);
  if (!item) return next(new ExpressError("Item not found", 404));

  return res.json(item);
});

// PATCH /items/:name - Update a single item by name
router.patch("/:name", (req, res, next) => {
  const item = items.find(i => i.name === req.params.name);
  if (!item) return next(new ExpressError("Item not found", 404));

  const { name, price } = req.body;
  if (name) item.name = name;
  if (price) item.price = price;

  return res.json({ updated: item });
});

// DELETE /items/:name - Delete a single item by name
router.delete("/:name", (req, res, next) => {
  const itemIndex = items.findIndex(i => i.name === req.params.name);
  if (itemIndex === -1) return next(new ExpressError("Item not found", 404));

  items.splice(itemIndex, 1);
  return res.json({ message: "Deleted" });
});

module.exports = router;
