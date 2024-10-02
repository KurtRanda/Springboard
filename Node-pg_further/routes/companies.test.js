const request = require('supertest');
const app = require('../app'); // Adjust the path to your app.js

let server;

beforeAll(() => {
  server = app.listen(3000);
});

afterAll((done) => {
  server.close(done);  // Ensure the server is closed after tests
});


describe('Test Companies Routes', () => {

  test('GET /companies - should return a list of companies', async () => {
    const res = await request(app).get('/companies');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.any(Array)); // Assuming companies are returned as an array
  });

  test('POST /companies - should create a new company with a slugified code', async () => {
    const newCompany = { name: 'Apple Inc.', description: 'Tech company' };
    
    const res = await request(app)
      .post('/companies')
      .send(newCompany);
      
    expect(res.statusCode).toBe(201);
    expect(res.body.company).toHaveProperty('code', 'apple-inc');
    expect(res.body.company).toHaveProperty('name', 'Apple Inc.');
  });
  
  test('POST /industries - should add a new industry', async () => {
    const newIndustry = { code: 'edu', industry: 'Education' };
  
    const res = await request(app)
      .post('/industries')
      .send(newIndustry);
  
    expect(res.statusCode).toBe(201);
    expect(res.body.industry).toHaveProperty('code', 'edu');
    expect(res.body.industry).toHaveProperty('industry', 'Education');
  });
  

  test('GET /companies/:code - should return details of a specific company', async () => {
    const res = await request(app).get('/companies/apple');
    expect(res.statusCode).toBe(200);
    expect(res.body.company).toHaveProperty('code', 'apple');
  });

  test('PUT /companies/:code - should update an existing company', async () => {
    const updatedData = { name: 'Apple Inc.', description: 'Updated description' };
    const res = await request(app).put('/companies/apple').send(updatedData);
    expect(res.statusCode).toBe(200);
    expect(res.body.company).toHaveProperty('name', 'Apple Inc.');
  });

  test('DELETE /companies/:code - should delete a specific company', async () => {
    const res = await request(app).delete('/companies/apple');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Company deleted');  // Ensure this is what the API actually returns
  });  
  
});
