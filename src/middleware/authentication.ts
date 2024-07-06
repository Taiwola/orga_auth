import {getOneUser} from "../service"
import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";


interface Decoded {
    userId: string,
    email: string
}

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(400).json({ success: false, message: 'Not authorized, no token' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Token not provided' });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET) as Decoded;
            if (!decode) {
                return res.status(403).json({ success: false, message: 'Forbidden' });
            }

            const user = await getOneUser(decode.userId);
            if (!user) {
                return res.status(401).json({ success: false, message: 'Token not authorized' });
              }

              req.user = {
                    userId: user.userId,
                    email: user.email
              };
              next();

        } catch (error) {
            console.log(error);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}