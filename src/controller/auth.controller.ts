import {Request, Response} from "express";
import { loginValidator, registerValidator } from "../utils/validator";
import { UserInterface } from "../interface/user.interface";
import { createOrganisation, createUser, getUserEmail } from "../service";
import { OrganisationInterface } from "../interface/organisation.interface";
import bcrypt from "bcryptjs";
import { generateJwt } from "../middleware/token";

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

        if (!user) {
            return res.status(400).json({
                status: "Bad Request",
                message: "Registration unsuccessful",
                statusCode: 400
            })
        }

        // create a default organisation for the user
        const orgOptions: OrganisationInterface = {
            name: `${user.firstName}Organisation`,
            description:  `This is the default organisation for ${user.firstName} ${user.lastName}.`,
            users: [user],
        }

        await createOrganisation(orgOptions);

         // Remove password before sending the user object to the frontend
         const { password, ...userWithoutPassword } = user;
         const assessToken = await generateJwt(user.email, user.userId);

        return res.status(201).json({
            status: 'success',
            message: 'Registration successful',
            data: {
                accessToken: assessToken,
                user: userWithoutPassword
            }
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


export const loginUser = async (req: Request, res: Response) => {
    try {
        const {error} = loginValidator.validate(req.body, {abortEarly: false});

        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(422).json({ errors: errorMessages });
        }

        const {email, password} = req.body;

        // check if user exist
        const user = await getUserEmail(email);

        if (!user) {
            return res.status(404).json({
                status: "NotFound",
                message: "Invalid credential",
                statusCode: 404
            })
        }

        const pwd = await bcrypt.compare(password, user.password);

        if (!pwd) return res.status(401).json({
            status: "Bad Request",
            message: "Invalid credentials",
            statusCode: 401
        });

        const accessToken = await generateJwt(user.email, user.userId);

        const {password: pwduser, ...userwithoutpwd} = user;

        return res.status(200).json({
            status:"successful",
            message: "Login successful",
            data: {
                accessToken: accessToken,
                user: userwithoutpwd
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'Internal Server Error',
            message: 'An error occurred during login',
            statusCode: 500
        });
    }
} 