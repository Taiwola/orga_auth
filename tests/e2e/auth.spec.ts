import request from 'supertest';
import app from '../../src/index'; // Adjust the path to your app file
import { connectionSource } from '../../src/database/database-source';
import { createUser } from '../../src/service';
import { UserInterface } from '../../src/interface/user.interface';
import { generateJwt } from '../../src/middleware/token';
import * as userService from "../../src/service/user.service"
import * as bcrypt from "bcryptjs";
import * as orgService from "../../src/service/organisation.service";

jest.mock('../../src/service/user.service.ts');
jest.mock('bcryptjs');
jest.mock('../../src/service/organisation.service');

describe('Auth Endpoints', () => {

  beforeAll(async () => {
    await connectionSource.initialize();
    // await connectionSource.synchronize(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
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

      const createdUser = {
        ...userData,
        id: '123',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      (userService.createUser as jest.Mock).mockResolvedValue(createdUser);
      (userService.getUserEmail as jest.Mock).mockResolvedValue(null);
      (orgService.createOrganisation as jest.Mock).mockResolvedValue({
        name: `${createdUser.firstName}Organisation`,
        description: `This is the default organisation for ${createdUser.firstName} ${createdUser.lastName}.`,
        users: [createdUser]
      });

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

      const existingUser = {
        ...userData,
        id: '123',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      (userService.getUserEmail as jest.Mock).mockResolvedValue(existingUser);

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

      const hashedPassword = await bcrypt.hash(registerData.password, 10);
      const createdUser = {
        ...registerData,
        id: '123',
        password: hashedPassword, // Mock hashed password
        createdAt: new Date(),
        updatedAt: new Date()
      };
      (userService.createUser as jest.Mock).mockResolvedValue(createdUser);
      (userService.getUserEmail as jest.Mock).mockResolvedValue(createdUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

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
      (userService.getUserEmail as jest.Mock).mockResolvedValue(null);

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

      const hashedPassword = await bcrypt.hash(registerData.password, 10);
      const createdUser = {
        ...registerData,
        id: '123',
        password: hashedPassword, // Mock hashed password
        createdAt: new Date(),
        updatedAt: new Date()
      };

      (userService.getUserEmail as jest.Mock).mockResolvedValue(createdUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Mock password comparison

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
