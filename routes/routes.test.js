const request = require('supertest');
const app = require('../server')


describe('GET /books', () => {
  it('should return all books', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });

  it('should return a single book by ID', async () => {
    const fakeId = '1'; // Replace with a real ID or mock the controller
    const res = await request(app).get(`/books/${fakeId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });
});

describe('GET /borrows', () => {
  it('should return all borrows', async () => {
    const res = await request(app).get('/borrows');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });
});

describe('GET /reviews', () => {
  it('should return all reviews', async () => {
    const res = await request(app).get('/reviews');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });
});

describe('GET /users', () => {
  it('should return all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });
});
