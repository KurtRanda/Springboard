const request = require('supertest');
const app = require('../app'); // Adjust the path to your app.js

let server;

beforeAll(() => {
  server = app.listen(3000);
});

afterAll((done) => {
  server.close(done);  // Ensure the server is closed after tests
});


describe('Test Invoices Routes', () => {

  test('GET /invoices - should return a list of invoices', async () => {
    const res = await request(app).get('/invoices');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.any(Array)); // Assuming invoices are returned as an array
  });

  test('POST /invoices - should create a new invoice', async () => {
    const newInvoice = { comp_code: 'apple', amt: 400 };
    const res = await request(app).post('/invoices').send(newInvoice);
    expect(res.statusCode).toBe(201);
    expect(res.body.invoice).toHaveProperty('comp_code', 'apple');
    expect(res.body.invoice).toHaveProperty('amt', 400);
  });

  test('GET /invoices/:id - should return details of a specific invoice', async () => {
    const res = await request(app).get('/invoices/1'); // Assuming 1 is an existing invoice ID
    expect(res.statusCode).toBe(200);
    expect(res.body.invoice).toHaveProperty('id', 1);
  });

  test('PUT /invoices/:id - should update an invoice and handle paid status', async () => {
    // Updating an unpaid invoice to paid
    const res = await request(app)
      .put('/invoices/1')
      .send({ amt: 500, paid: true });
      
    expect(res.statusCode).toBe(200);
    expect(res.body.invoice).toHaveProperty('id', 1);
    expect(res.body.invoice).toHaveProperty('paid', true);
    expect(new Date(res.body.invoice.paid_date)).toEqual(expect.any(Date));  // paid_date should be today's date
  
    // Un-paying the invoice, should set paid_date to null
    const resUnpay = await request(app)
      .put('/invoices/1')
      .send({ amt: 500, paid: false });
      
    expect(resUnpay.statusCode).toBe(200);
    expect(resUnpay.body.invoice).toHaveProperty('paid', false);
    expect(resUnpay.body.invoice.paid_date).toBeNull();  // paid_date should be null
  });
  

  test('DELETE /invoices/:id - should delete a specific invoice', async () => {
    const res = await request(app).delete('/invoices/1'); // Assuming 1 is an existing invoice ID
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Invoice deleted');
  });
  
});
