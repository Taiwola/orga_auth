import request from 'supertest';
import app from '../src/index'; // Adjust the path to your app file
import { connectionSource } from '../src/database/database-source';
import { createUser } from '../src/service';
import { UserInterface } from '../src/interface/user.interface';
import { generateJwt } from '../src/middleware/token';

describe('Auth Endpoints', () => {

  beforeAll(async () => {
    await connectionSource.initialize();
    // await connectionSource.synchronize(true);
  });


  describe('POST /api/auth/register', () => {
    it('should register a user successfully', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: "08105765035"
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        status: 'success',
        message: 'Registration successful',
        data: {
          user: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com'
          }
        }
      });
    });

    it('should return 409 if email already exists', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: "081056750353"
      };

      await request(app)
        .post('/api/auth/register')
        .send(userData);

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(409);
      expect(response.body).toMatchObject({
        status: 'Conflict',
        message: 'This email is already in use',
        statusCode: 409
      });
    });

    it('should return 422 for validation errors', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ email: 'invalidEmail' });

      expect(response.status).toBe(422);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login a user successfully', async () => {
      const registerData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      };

      await request(app)
        .post('/api/auth/register')
        .send(registerData);

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

      await request(app)
        .post('/api/auth/register')
        .send(registerData);

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
