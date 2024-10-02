const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming db.js is properly set up to connect to PostgreSQL

/** GET /invoices: return info on all invoices */
router.get('/', async (req, res, next) => {
  try {
    const result = await db.query('SELECT id, comp_code FROM invoices');
    return res.json({ invoices: result.rows });
  } catch (err) {
    return next(err);
  }
});

// verify routing
router.get('/test', (req, res) => {
    res.send('Invoices route is working');
  });

  
/** GET /invoices/[id]: return obj of given invoice */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `SELECT i.id, 
              i.amt, 
              i.paid, 
              i.add_date, 
              i.paid_date, 
              c.code, 
              c.name, 
              c.description 
       FROM invoices AS i
       JOIN companies AS c ON i.comp_code = c.code
       WHERE i.id = $1`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    const data = result.rows[0];
    const invoice = {
      id: data.id,
      amt: data.amt,
      paid: data.paid,
      add_date: data.add_date,
      paid_date: data.paid_date,
      company: {
        code: data.code,
        name: data.name,
        description: data.description
      }
    };

    return res.json({ invoice });
  } catch (err) {
    return next(err);
  }
});

/** POST /invoices: add an invoice */
router.post('/', async (req, res, next) => {
  try {
    const { comp_code, amt } = req.body;
    const result = await db.query(
      `INSERT INTO invoices (comp_code, amt) 
       VALUES ($1, $2) 
       RETURNING id, comp_code, amt, paid, add_date, paid_date`, 
      [comp_code, amt]
    );
    return res.status(201).json({ invoice: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

/** PUT /invoices/[id]: update an existing invoice */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amt, paid } = req.body;

    // Retrieve the current invoice details
    const invoiceResult = await db.query(
      `SELECT paid, paid_date 
       FROM invoices 
       WHERE id = $1`,
      [id]
    );

    const invoice = invoiceResult.rows[0];

    if (!invoice) {
      throw new ExpressError(`Invoice with id ${id} not found`, 404);
    }

    let paidDate = invoice.paid_date;

    // If paying an unpaid invoice, set paid_date to today
    if (!invoice.paid && paid) {
      paidDate = new Date();
    }

    // If un-paying, set paid_date to null
    else if (invoice.paid && !paid) {
      paidDate = null;
    }

    // Update the invoice with the new amount and paid status
    const result = await db.query(
      `UPDATE invoices 
       SET amt = $1, paid = $2, paid_date = $3
       WHERE id = $4
       RETURNING id, comp_code, amt, paid, add_date, paid_date`,
      [amt, paid, paidDate, id]
    );

    return res.json({ invoice: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /invoices/[id]: delete an invoice */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM invoices WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    return res.json({ status: "deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
