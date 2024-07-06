import { Organisation } from "../database/enitites/organisation-model"

export interface UserInterface {
    userId?: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    organisation?: Organisation[],
    createdAt?: Date,
    updatedAt?: Date
}


export interface UserPartialInterface extends UserInterface {}