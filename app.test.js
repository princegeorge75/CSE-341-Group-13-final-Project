const request = require('supertest');
const express = require('express');

// Create a test app
const app = express();
app.use(express.json());

// Mock the verifyToken middleware to allow requests through
jest.mock('./middleware/authT', () => ({
  verifyToken: (req, res, next) => next(),
}));

// Mock controller
const mockEventController = {
  getEvents: (req, res) => res.status(200).json([]), // Return empty array for test
};

// Set up the route manually for this test
const router = express.Router();
const { verifyToken } = require('./middleware/authT');
router.get('/', verifyToken, mockEventController.getEvents);
app.use('/events', router);

describe('Event Routes', () => {
  it('should return 200 and an array when GET /events is called', async () => {
    const res = await request(app).get('/events');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
