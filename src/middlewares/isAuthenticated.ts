import {NextFunction, Request, Response} from "express";
import { verify } from "jsonwebtoken"
import { AppError } from "../errors/AppError";

interface Payload{
    sub: string;
}

export function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
){
    const authToken = request.headers.authorization;

    if(!authToken) throw new AppError('Não autorizado.', 401);

    const [, token] = authToken.split(" ");

    try{
        const { sub } = verify(token, process.env.JWT_SECRET) as Payload
        
        request.user_id = sub;

        return next();
    }catch(err){
        throw new AppError('Não autorizado', 401)
    }

    console.log(authToken);    
}