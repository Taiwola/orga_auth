import {connectionSource} from "../database/database-source";
import { User } from "../database/enitites/user-model";
import { UserInterface, UserPartialInterface } from "../interface/user.interface";

const userRepository = connectionSource.getRepository(User);


export const createUser = async (userData: UserInterface) => {
    const user = userRepository.create({
        ...userData
    });

    await userRepository.save(user);

    return user;
}


export const updateUser = async (userId: string, userData: UserPartialInterface) => {
    const user = await userRepository.update(userId,{
        ...userData
    });

    return user;
}


export const getAllUser = async () => {
    const users = await userRepository.find({
        relations: ["organisations"]
    });

    return users;
}

export const getOneUser = async (userId: string) => {
    const user = await userRepository.findOne({
        where: {userId: userId},
        relations: ["organisations"]
    });

    return user;
}

export const deleteUser = async (userId: string) => {
    const user = await userRepository.delete(userId);
    return user;
}