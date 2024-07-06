import request from 'supertest';
import app from '../src/index'; // Assuming you have an Express app instance in app.ts or similar
import { connectionSource } from '../src/database/database-source';
import { User } from '../src/database/enitites/user-model';
import { Organisation } from '../src/database/enitites/organisation-model';

describe('User Registration', () => {
  beforeAll(async () => {
    await connectionSource.initialize();
    await connectionSource.synchronize(true);
  });

  afterAll(async () => {
    await connectionSource.destroy();
  });

  it('should register user successfully with default organisation', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Registration successful');
    expect(response.body.user).not.toHaveProperty('password');
    expect(response.body.user).toMatchObject({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890'
    });
  });

  it('should fail if required fields are missing', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'Jane',
        lastName: 'Doe'
        // email and password are missing
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toContain('email is required');
    expect(response.body.errors).toContain('password is required');
  });

  it('should fail if email is already in use', async () => {
    // Register first user
    await request(app)
      .post('/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890'
      });

    // Try to register another user with the same email
    const response = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '0987654321'
      });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('status', 'Conflict');
    expect(response.body).toHaveProperty('message', 'This email is already in use');
  });
});
