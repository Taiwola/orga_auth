import jwt from "jsonwebtoken";


export const generateJwt = async (email:string, id: String) => {
    const payload = {email, id};
    const token =  jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
    return token;
}