import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
import type { IUser } from "../model/User.js";

export interface AuthenticatedRequest extends Request{
    user?:IUser | null
}

export const isAuth = async(req:AuthenticatedRequest, res:Response, next:NextFunction):
Promise<void> => {
    try{
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith("Bearer")){
            res.status(401).json({
                message:"Please Login - No auth header",
            })
            return;
        }

        const token = authHeader.split(" ")[1]
        
        if(!token){
            res.status(401).json({
                message:"no token received"
            })
            return;
        }
        // console.log(token,"token")

        const decodedValue = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload



        if(!decodedValue || !decodedValue.user){
            res.status(401).json({
                message:"Invalid token"
            })
            return;
        }

        // console.log(decodedValue)

        req.user = decodedValue.user;

        return next()
    }catch(error){
        res.status(401).json({
            message:"Please Login - JWT error"
        })
    }
}
