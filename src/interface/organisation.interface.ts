import { User } from "../database/enitites/user-model";

export interface OrganisationInterface {
    name: string,
    description: string,
    users: User[],
    createdAt: Date,
    updatedAt: Date
}


export interface OrganisationPartialInterface extends OrganisationInterface {}