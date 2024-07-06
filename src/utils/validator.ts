import Joi from "joi";
import {emailMessages, firstNameMessages, lastNameMessages, nameMessages, passwordMessages, phoneMessages} from "./response";

export const registerValidator = Joi.object({
    firstName: Joi.string().min(3).max(50).required().messages(firstNameMessages),
    lastName: Joi.string().min(3).max(50).required().messages(lastNameMessages),
    email: Joi.string().email().required().messages(emailMessages),
    password: Joi.string().min(3).max(50).required().messages(passwordMessages),
    phone: Joi.string().min(10).required().messages(phoneMessages)
});


export const loginValidator = Joi.object({
    email: Joi.string().email().required().messages(emailMessages),
    password: Joi.string().min(3).max(50).required().messages(passwordMessages)
});


export const createOrgValidator = Joi.object({
    name: Joi.string().min(3).max(50).required().messages(nameMessages),
    description: Joi.string().optional()
})