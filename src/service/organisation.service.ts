import {connectionSource} from "../database/database-source";
import { Organisation } from "../database/enitites/organisation-model";
import { OrganisationInterface, OrganisationPartialInterface } from "../interface/organisation.interface";


const organisationRepository = connectionSource.getRepository(Organisation);


export const createOrganisation = async (orgaData: OrganisationInterface) => {
    const org = organisationRepository.create({
        ...orgaData
    });

    await organisationRepository.save(org);

    return org;
};


export const updateOrganisation = async (orgId:string, orgaData: OrganisationPartialInterface) => {
    const org = await organisationRepository.update(orgId, {
        ...orgaData
    });

    return org;
}


export const getAllOrg = async () => {
    const orgs = await organisationRepository.find({
        relations: ["users"]
    });

    return orgs;
};


export const getOneOrg = async (orgId:string) => {
    const org = await organisationRepository.findOne({
        where: {orgId: orgId},
        relations: ["users"]
    });

    return org;
}

export const getAllUserOrg = async (userId: string) => {
    const org = await organisationRepository.find({
        where: {users: {userId: userId}}
    });

    return org;
}


export const deleteOrg = async (orgId: string) => {
    const org = await organisationRepository.delete(orgId);
    return org;
}