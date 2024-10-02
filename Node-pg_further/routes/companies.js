const express = require('express');
const router = new express.Router();
const db = require('../db'); // Assuming `db.js` is set up to connect to your PostgreSQL database

// Middleware for handling JSON input
router.use(express.json());

/** GET /companies: return list of companies */
router.get('/', async (req, res, next) => {
  try {
    const result = await db.query('SELECT code, name FROM companies');
    return res.json({ companies: result.rows });
  } catch (err) {
    return next(err);
  }
});


// GET /companies/:code - get details of a company, including industries
router.get('/:code', async (req, res, next) => {
  try {
    const { code } = req.params;

    // Fetch the company details
    const companyResult = await db.query(
      `SELECT code, name, description 
       FROM companies 
       WHERE code = $1`, [code]);

    if (companyResult.rows.length === 0) {
      throw new ExpressError(`Company with code ${code} not found`, 404);
    }

    // Fetch the industries associated with the company
    const industriesResult = await db.query(
      `SELECT i.industry 
       FROM industries AS i
       JOIN company_industries AS ci ON i.code = ci.industry_code
       WHERE ci.company_code = $1`, [code]);

    const company = companyResult.rows[0];
    const industries = industriesResult.rows.map(row => row.industry);

    return res.json({ company, industries });
  } catch (err) {
    return next(err);
  }
});

  
// GET /companies/:code/industries - get all industries for a company
router.get('/:code/industries', async (req, res, next) => {
  try {
    const { code } = req.params;

    const result = await db.query(`
      SELECT i.industry
      FROM industries AS i
      JOIN company_industries AS ci ON i.code = ci.industry_code
      WHERE ci.company_code = $1`, [code]);

    if (result.rows.length === 0) {
      throw new ExpressError(`No industries found for company: ${code}`, 404);
    }

    return res.json({ industries: result.rows.map(r => r.industry) });
  } catch (err) {
    return next(err);
  }
});

// GET /industries - list all industries and their associated companies
router.get('/industries', async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT i.code AS industry_code, i.industry, 
             ARRAY_AGG(ci.company_code) AS companies
      FROM industries AS i
      LEFT JOIN company_industries AS ci ON i.code = ci.industry_code
      GROUP BY i.code, i.industry
    `);

    return res.json({ industries: result.rows });
  } catch (err) {
    return next(err);
  }
});


// POST /companies - create a new company
router.post('/', async (req, res, next) => {
  try {
    const { name, description } = req.body;

    // Generate the company code by slugifying the company name
    const code = slugify(name, {
      lower: true,       // Convert to lowercase
      strict: true       // Remove special characters
    });

    const result = await db.query(
      `INSERT INTO companies (code, name, description) 
       VALUES ($1, $2, $3) 
       RETURNING code, name, description`,
      [code, name, description]
    );

    return res.status(201).json({ company: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

// POST /industries - add a new industry
router.post('/industries', async (req, res, next) => {
  try {
    const { code, industry } = req.body;

    const result = await db.query(
      `INSERT INTO industries (code, industry) 
       VALUES ($1, $2)
       RETURNING code, industry`,
      [code, industry]
    );

    return res.status(201).json({ industry: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

// POST /companies/:code/industries/:industry_code - add an industry to a company
router.post('/:code/industries/:industry_code', async (req, res, next) => {
  try {
    const { code, industry_code } = req.params;

    // Check if the company exists
    const companyCheck = await db.query(`SELECT code FROM companies WHERE code = $1`, [code]);
    if (companyCheck.rows.length === 0) {
      throw new ExpressError(`Company with code ${code} not found`, 404);
    }

    // Check if the industry exists
    const industryCheck = await db.query(`SELECT code FROM industries WHERE code = $1`, [industry_code]);
    if (industryCheck.rows.length === 0) {
      throw new ExpressError(`Industry with code ${industry_code} not found`, 404);
    }

    // Insert the company-industry relationship
    const result = await db.query(
      `INSERT INTO company_industries (company_code, industry_code) 
       VALUES ($1, $2) RETURNING company_code, industry_code`,
      [code, industry_code]
    );

    return res.status(201).json({ message: `Industry ${industry_code} added to company ${code}` });
  } catch (err) {
    return next(err);
  }
});


// POST /companies/:code/industries/:industry_code - associate an industry with a company
router.post('/companies/:code/industries/:industry_code', async (req, res, next) => {
  try {
    const { code, industry_code } = req.params;

    // Check if the company exists
    const companyCheck = await db.query(
      `SELECT code FROM companies WHERE code = $1`, [code]);
    if (companyCheck.rows.length === 0) {
      throw new ExpressError(`Company with code ${code} not found`, 404);
    }

    // Check if the industry exists
    const industryCheck = await db.query(
      `SELECT code FROM industries WHERE code = $1`, [industry_code]);
    if (industryCheck.rows.length === 0) {
      throw new ExpressError(`Industry with code ${industry_code} not found`, 404);
    }

    // Insert the association between the company and the industry
    await db.query(
      `INSERT INTO company_industries (company_code, industry_code) 
       VALUES ($1, $2)`,
      [code, industry_code]
    );

    return res.status(201).json({ message: `Industry ${industry_code} associated with company ${code}` });
  } catch (err) {
    return next(err);
  }
});

/** PUT /companies/[code]: edit existing company */
router.put('/:code', async (req, res, next) => {
  try {
    const { code } = req.params;
    const { name, description } = req.body;
    const result = await db.query(
      'UPDATE companies SET name = $1, description = $2 WHERE code = $3 RETURNING code, name, description',
      [name, description, code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Company not found" });
    }

    return res.json({ company: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /companies/[code]: delete company */
router.delete('/:code', async (req, res, next) => {
  try {
    const { code } = req.params;
    const result = await db.query('DELETE FROM companies WHERE code = $1 RETURNING code', [code]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Company not found" });
    }

    return res.json({ status: "deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
