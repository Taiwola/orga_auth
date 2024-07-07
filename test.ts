import request from 'supertest';
import app from '../../src/index'; // Adjust the path to your app file
import { connectionSource } from '../../src/database/database-source';
import * as userService from '../../src/service/userService'; // Adjust the path to your user service

jest.mock('../../src/service/userService');

describe('Auth Endpoints', () => {

  beforeAll(async () => {
    await connectionSource.initialize();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await connectionSource.destroy();
  });

  describe('POST /api/auth/login', () => {
    it('should login a user successfully', async () => {
      const registerData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      };

      const createdUser = {
        ...registerData,
        id: '123',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      (userService.createUser as jest.Mock).mockResolvedValue(createdUser);
      (userService.findUserByEmail as jest.Mock).mockResolvedValue(createdUser);

      // No need to actually register the user in the test, just ensure the mocks are set up
      const loginData = {
        email: 'john.doe@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: 'successful',
        message: 'Login successful',
        data: {
          user: {
            email: 'john.doe@example.com'
          }
        }
      });
    });

    it('should return 404 for non-existing user', async () => {
      (userService.findUserByEmail as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'nonexistent@example.com', password: 'password123' });

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        status: 'NotFound',
        message: 'Invalid credential',
        statusCode: 404
      });
    });

    it('should return 401 for invalid password', async () => {
      const registerData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      };

      const createdUser = {
        ...registerData,
        id: '123',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      (userService.findUserByEmail as jest.Mock).mockResolvedValue(createdUser);

      // No need to actually register the user in the test, just ensure the mocks are set up
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'john.doe@example.com', password: 'wrongPassword' });

      expect(response.status).toBe(401);
      expect(response.body).toMatchObject({
        status: 'Bad Request',
        message: 'Invalid credentials',
        statusCode: 401
      });
    });

    it('should return 422 for validation errors', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'invalidEmail' });

      expect(response.status).toBe(422);
      expect(response.body).toHaveProperty('errors');
    });
  });

  afterAll(async () => {
    await connectionSource.destroy();
  });
});
