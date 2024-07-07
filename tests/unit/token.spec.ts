import { generateJwt } from '../../src/middleware/token';
import jwt from 'jsonwebtoken';

describe('Token Generation', () => {
  it('should generate a token with correct user details', async () => {
    const email = 'john.doe@example.com';
    const userId = '12345';
    const token = await generateJwt(email, userId);

    const decoded =  jwt.decode(token) as {email: string, id: string} ;
    console.log(decoded);

    expect(decoded.email).toBe(email);
    expect(decoded.id).toBe(userId);
  });

  it('should expire the token at the correct time', async() => {
    const email = 'john.doe@example.com';
    const userId = '12345';
    const token =await generateJwt(email, userId);

    const decoded = jwt.decode(token) as { exp: number };

    const currentTime = Math.floor(Date.now() / 1000);
    const expectedExpiration = currentTime + 86400; // Assuming token expires in 1 day (86400 seconds)

    expect(decoded.exp).toBeCloseTo(expectedExpiration, -1);
  });

  it('should verify a valid token successfully', async () => {
    const email = 'john.doe@example.com';
    const userId = '12345';
    const token = await generateJwt(email, userId);

    const verified = jwt.verify(token, process.env.JWT_SECRET) as {email: string, id: string};

    

    expect(verified).toHaveProperty('email', email);
    expect(verified).toHaveProperty('id', userId);
  });

  it('should not verify an invalid token', () => {
    const token = 'invalid.token.string';

    expect(() => jwt.verify(token, process.env.JWT_SECRET)).toThrow();
  });
});
