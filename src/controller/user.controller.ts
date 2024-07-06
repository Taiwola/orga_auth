import {Request, Response} from "express";
import { getOneUser } from "../service";


export const get_one_user = async (req: Request, res: Response) => {
    const Id = req.params.Id;

    const user = await getOneUser(Id);
    console.log(`Fetched user: ${user}`);

    if (!user) {
        return res.status(404).json({
            status: "NotFound",
            message: "User does not exist",
            statusCode: 404
        })
    };

    const {password, ...userwithoutpwd} = user;

    return res.status(200).json({
        status: "success",
        message: "User found",
        data: userwithoutpwd
    })
}