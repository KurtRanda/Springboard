const request = require('supertest');
const app = require('./app'); // Ensure this path points to your app.js

let server;

beforeAll(() => {
  server = app.listen(3000);
});

afterAll((done) => {
  server.close(done);  // Ensure the server is closed after tests
});

describe('BizTime Express App', () => {

  test('GET / - should confirm server is running', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Server is running');
  });

  test('GET /companies - should return a list of companies', async () => {
    const res = await request(app).get('/companies');
    expect(res.statusCode).toBe(200);
    expect(res.body.companies).toEqual(expect.any(Array));  // Adjust to match the response structure
  });
  
  
  test('GET /invoices - should return a list of invoices', async () => {
    const res = await request(app).get('/invoices');
    expect(res.statusCode).toBe(200);
    expect(res.body.invoices).toEqual(expect.any(Array));  // Adjust to match the response structure
  });
  
  

  test('404 handler - should return 404 for non-existent routes', async () => {
    const res = await request(app).get('/non-existent-route');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Not Found');  // Adjust to check for 'message'
  });
  
  
  test('General error handler - should handle errors properly', async () => {
    const res = await request(app).get('/companies'); // Assuming this will throw an error if no companies exist
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Not Found');
  });
});
