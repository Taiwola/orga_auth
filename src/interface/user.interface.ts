import { Organisation } from "../database/enitites/organisation-model"

export interface UserInterface {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    organisation: Organisation[],
    createAt: Date,
    updatedAt: Date
}


export interface UserPartialInterface extends UserInterface {}