import {Request, Response} from "express";
import { registerValidator } from "../utils/validator";
import { UserInterface } from "../interface/user.interface";
import { createOrganisation, createUser, getUserEmail } from "../service";
import { OrganisationInterface } from "../interface/organisation.interface";
import bcrypt from "bcryptjs";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const {error} = registerValidator.validate(req.body, {abortEarly: false});
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(422).json({ errors: errorMessages });
        }

        const dataBody: UserInterface = req.body;

        const userExist = await getUserEmail(dataBody.email);

        if (userExist) {
            return res.status(409).json({ status: 'Conflict', message: 'This email is already in use',  statusCode: 409 });
        }

        const hashpwd = await bcrypt.hash(dataBody.password, 10);

        const userOptions = {
            ...dataBody,
            password: hashpwd
        }

        // create user if user does not exist
        const user = await createUser(userOptions);

        // create a default organisation for the user
        const orgOptions: OrganisationInterface = {
            name: `${user.firstName}Organisation`,
            description:  `This is the default organisation for ${user.firstName} ${user.lastName}.`,
            users: [user],
        }

        await createOrganisation(orgOptions);

         // Remove password before sending the user object to the frontend
         const { password, ...userWithoutPassword } = user;

        return res.status(201).json({
            status: 'success',
            message: 'Registration successful',
            user: userWithoutPassword
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'Internal Server Error',
            message: 'An error occurred during registration',
            statusCode: 500
        });
    }
}