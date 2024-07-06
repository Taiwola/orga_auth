import request from 'supertest';
import app from '../src/index'; // Adjust the path as needed
import { connectionSource } from '../src/database/database-source'; // Adjust the path as needed
import { createUser, createOrganisation, getOneOrg, getOneUser, addUserToOrg } from '../src/service'; // Adjust paths accordingly
import { generateJwt } from '../src/middleware/token';
import { OrganisationInterface } from '../src/interface/organisation.interface';

describe('Organisation Endpoints', () => {
  let token: string;

  beforeAll(async () => {
    await connectionSource.initialize(); // Initialize database connection or setup mock DB

    // Assuming you create a user and generate a token for tests
     // Example of generating a random email
    const user = {
      email: "johndoe1234@gmail.com",
      password: 'password',
      firstName: 'John',
      lastName: 'Doe',
      phone: '123-456-7890',
    };

    // Create user and organisation
    const createdUser = await createUser(user);
    token = await generateJwt(createdUser.email, createdUser.userId); // Assuming generateJwt function exists
  });

 describe('GET /api/org/all', () => {
    it('should get all organisations for a user', async () => {
      const res = await request(app)
        .get('/api/organisations')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status', 'success');
      expect(res.body).toHaveProperty('message', 'Organisations');
      expect(res.body.data).toBeInstanceOf(Array); // Assuming it returns an array of organisations
    });
  });

  describe('GET /api/org/:id', () => {
    it('should get a single organisation by ID', async () => {

        const organisation: OrganisationInterface = {
            name: "Test Organisation",
            description: "A new test organisation"
        }

    
        const createdOrg = await createOrganisation(organisation);
      const res = await request(app)
        .get(`/api/organisations/${createdOrg.orgId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status', 'success');
      expect(res.body).toHaveProperty('message', 'Organisation found');
    });

    // it('should return 404 if organisation does not exist', async () => {
    //   const nonExistingOrgId = 'non-existing-id'; // Replace with a non-existing ID
    //   const res = await request(app)
    //     .get(`/api/org/${nonExistingOrgId}`)
    //     .set('Authorization', `Bearer ${token}`);

    //   expect(res.statusCode).toEqual(404);
    //   expect(res.body).toHaveProperty('status', 'Not Found');
    //   expect(res.body).toHaveProperty('message', 'Organisation does not exist');
    // });
  });

  describe('POST /api/org/create', () => {
    it('should create an organisation successfully', async () => {
      const newOrg: OrganisationInterface = {
        name: 'Test Organisation',
        description: 'A test organisation',
      };

      const res = await request(app)
        .post('/api/organisations')
        .send(newOrg)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('status', 'success');
      expect(res.body).toHaveProperty('message', 'Organisation created successfully');
    });

    it('should return 422 for validation errors', async () => {
      // Assuming invalid data that triggers validation errors
      const invalidOrg = {
        // Missing required fields or invalid data
      };

      const res = await request(app)
        .post('/api/organisations')
        .send(invalidOrg)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(422);
    });
  });

  describe('POST /api/org/:id/adduser', () => {
    
    it('should add a user to an organisation successfully', async () => {
        const user = {
            email: "johndoe124234@gmail.com",
            password: 'password',
            firstName: 'John',
            lastName: 'Doe',
            phone: '123-456-7890',
          };
      
          // Create user and organisation
          const createdUser = await createUser(user);

          const organisation: OrganisationInterface = {
            name: "Test2 Organisation",
            description: "A new test2 organisation"
        }
    
    
        const createdOrg = await createOrganisation(organisation);
        

      const res = await request(app)
        .post(`/api/organisations/${createdOrg.orgId}/users`)
        .send({ userId: createdUser.userId })
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status', 'success');
      expect(res.body).toHaveProperty('message', 'User added to organisation successfully');
    });

    it('should return 404 if user does not exist', async () => {

        const organisation: OrganisationInterface = {
            name: "Test3 Organisation",
            description: "A new test3 organisation"
        }
    
    
        const createdOrg = await createOrganisation(organisation);
      const nonExistingUserId = '1f9e0238-927f-4c5c-9023-064474d0d1aa'; // Replace with a non-existing user ID
      const orgId = createdOrg.orgId; // Replace with a valid organisation ID

      const res = await request(app)
        .post(`/api/organisations/${orgId}/users`)
        .send({ userId: nonExistingUserId })
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('status', 'NotFound');
      expect(res.body).toHaveProperty('message', 'User does not exist');
    });

    // it('should return 404 if organisation does not exist', async () => {
    //   const newUserId = 'new-user-id'; // Replace with a valid user ID
    //   const nonExistingOrgId = 'non-existing-id'; // Replace with a non-existing organisation ID

    //   const res = await request(app)
    //     .post(`/api/org/${nonExistingOrgId}/adduser`)
    //     .send({ userId: newUserId })
    //     .set('Authorization', `Bearer ${token}`);

    //   expect(res.statusCode).toEqual(404);
    //   expect(res.body).toHaveProperty('status', 'Not Found');
    //   expect(res.body).toHaveProperty('message', 'Organisation does not exist');
    // });
  });

  afterAll(async () => {
    await connectionSource.close(); // Close database connection or cleanup as necessary
  });
});
