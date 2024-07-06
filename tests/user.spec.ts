import request from 'supertest';
import app from '../src/index'; // Adjust the path to your app file
import { connectionSource } from '../src/database/database-source';
import { createUser } from '../src/service';
import { UserInterface } from '../src/interface/user.interface';
import { generateJwt } from '../src/middleware/token';


describe("User endpoint", () => {
    let token: string;

    beforeAll(async () => {
      await connectionSource.initialize();
      // await connectionSource.synchronize(true);
    });

    describe('GET /api/users/:Id', () => {
        it('should return 404 if user does not exist', async () => {
    
          const user: UserInterface = {
            email: 'test3@example.com',
            password: 'password',
            firstName: 'John3',
            lastName: 'Doe4',
            phone: '123-456-7890',
          };
          const createdUser = await createUser(user);
       
          token = await generateJwt(createdUser.email, createdUser.userId)
    
          const res = await request(app).get('/api/users/79d76d55-5aad-4765-b098-bb63fbfde6e6')
                                        .set('Authorization', `Bearer ${token}`);
          expect(res.statusCode).toEqual(404);
          expect(res.body).toHaveProperty('status', 'NotFound');
          expect(res.body).toHaveProperty('message', 'User does not exist');
        });
    
        it('should return 200 and the user if user exists', async () => {
          // Create a user first
          const user: UserInterface = {
            email: 'test@example.com',
            password: 'password',
            firstName: 'John2',
            lastName: 'Doe8',
            phone: '123-456-7890',
          };
    
          const createdUser = await createUser(user);
          token = await generateJwt(createdUser.email, createdUser.userId)
    
          const res = await request(app).get(`/api/users/${createdUser.userId}`)
                                        .set('Authorization', `Bearer ${token}`);
          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveProperty('status', 'success');
          expect(res.body).toHaveProperty('message', 'User found');
          expect(res.body.data).toHaveProperty('email', 'test@example.com');
          expect(res.body.data).not.toHaveProperty('password');
        });
      });


      afterAll(async () => {
        await connectionSource.destroy();
      });
})