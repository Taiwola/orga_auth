import {Request, Response} from "express";
import { addUserToOrg, createOrganisation, getAllUserOrg, getOneOrg, getOneUser, updateOrganisation } from "../service";
import { createOrgValidator } from "../utils/validator";
import { OrganisationInterface, OrganisationPartialInterface } from "../interface/organisation.interface";


export const get_all_org = async (req: Request, res: Response) => {
    const userId = req.user.userId;

    const organisation = await getAllUserOrg(userId);


    return res.status(200).json({
        status: "success",
        message: "Organisations",
        data: organisation
    })
}


export const get_one_org = async (req: Request, res: Response) => {
    const Id = req.params.Id;

    const organisation = await getOneOrg(Id);

    if (!organisation) {
        return res.status(404).json({
            status: "Not Found",
            message: "Organisation does not exist",
            statusCode: 404
        })
    }

    return res.status(200).json({
        status: "success",
        message: "Organisation found",
        data: organisation
    })
}

export const create_org = async (req: Request , res: Response) => {
    const {error} = createOrgValidator.validate(req.body, {abortEarly: false});

    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
            return res.status(422).json({ errors: errorMessages });
    }


    const dataBody: OrganisationInterface = req.body;

    const org = await createOrganisation(dataBody);

    if (!org) {
        return res.status(400).json({
            status: "Bad Request",
            message: "Client error",
            statusCode: 400
        })
    }

    return res.status(201).json({
        status: "success",
        message: "Organisation created successfully",
        data: org
    })
}

export const add_UserTo_Org = async (req: Request, res: Response) => {
    try {
        const {userId} = req.body;
        const Id = req.params.Id;

        const org = await getOneOrg(Id);
        const user = await getOneUser(userId);


        if (!user) {
            return res.status(404).json({
                status: "NotFound",
                message: "User does not exist",
                statusCode: 404
            })
        }

        if (!org) {
            return res.status(404).json({
                status: "Not Found",
                message: "Organisation does not exist",
                statusCode: 404
            })
        }

      

           await addUserToOrg(user, org)

            return res.status(200).json({
                status: "success",
                message: "User added to organisation successfully"
            })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'Internal Server Error',
            message: 'An error occurred during update',
            statusCode: 500
        });
    }
}