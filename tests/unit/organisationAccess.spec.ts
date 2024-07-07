import { Request, Response } from 'express';
import { get_one_org } from '../../src/controller/organisation.controller'; // Replace with actual path
import { getOneOrg } from '../../src/service/organisation.service'; // Replace with actual path
import { getOneUser } from '../../src/service/user.service'; // Replace with actual path


// Mock the organisation and user services
jest.mock('../../src/service/organisation.service');
jest.mock('../../src/service/user.service');

// Mock data
const mockOrganisation = {
    orgId: 'org_id_123',
    name: 'Test Organisation',
    description: "A test organisation",
    users: [{
        userId: 'user_id_123',
        firstName: 'Test User',
        lastName: 'User',
        email: 'test.user@email.com',
        password: "cepclc",
        phone: "123-231-342",
        createdAt: new Date(),
        updatedAt: new Date(),
    }],
    // Add other fields as needed
};

const mockUser = {
        userId: 'user_id_123',
        firstName: 'Test User',
        lastName: 'User',
        email: 'test.user@email.com',
        password: "cepclc",
        phone: "123-231-342",
        createdAt: new Date(),
        updatedAt: new Date(),
};

describe('Organisation Controller Access Tests', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return 200 and the organisation details if user has access', async () => {
        // Mock getOneOrg and getOneUser to return the mock data
        (getOneOrg as jest.Mock).mockResolvedValue(mockOrganisation);
        (getOneUser as jest.Mock).mockResolvedValue(mockUser);

        const mockRequest = {
            params: { Id: mockOrganisation.orgId } as Record<string, string>,
            user: { userId: mockUser.userId } // Simulate user with access
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        await get_one_org(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: 'success',
            message: 'Organisation found',
            data: mockOrganisation,
        });
    });

    it('should return 403 if user does not have access to the organisation', async () => {
        // Mock getOneOrg to return the mock organisation
        (getOneOrg as jest.Mock).mockResolvedValue(mockOrganisation);

        const mockRequest = {
            params: { Id: 'org_id_123' } as Record<string, string>,
            user: { userId: 'user_id_without_access' } // Simulate user without access
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        await get_one_org(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: 'Forbidden',
            message: 'You do not have access to view this organisation',
            statusCode: 403,
        });
    });

    it('should return 404 if organisation does not exist', async () => {
        // Mock getOneOrg to return null for non-existing org
        (getOneOrg as jest.Mock).mockResolvedValue(null);

        const mockRequest = {
            params: { Id: 'non_existing_org_id' } as Record<string, string>,
            user: { userId: 'user_id_1' } // Simulate user with access
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        await get_one_org(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: 'Not Found',
            message: 'Organisation does not exist',
            statusCode: 404,
        });
    });
});
