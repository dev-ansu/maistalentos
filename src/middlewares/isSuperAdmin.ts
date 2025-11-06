import {NextFunction, Request, Response} from "express";
import { verify } from "jsonwebtoken"
import { AppError } from "../errors/AppError";
import prisma from "../prisma";

interface Payload{
    sub: string;
    isSuperAdmin: boolean;
}

export async function isSuperAdmin(
    request: Request,
    response: Response,
    next: NextFunction
){
    const authToken = request.headers.authorization;

    if(!authToken) throw new AppError('Não autorizado.', 401);

    const [, token] = authToken.split(" ");

    try{
        const decoded  = verify(token, process.env.JWT_SECRET) as Payload
        
        if (!decoded.isSuperAdmin) {
            throw new AppError("Acesso restrito a administradores.", 403);
        }

        request.user_id = decoded.sub;

        const user = await prisma.user.findFirst({
            where: { id: request.user_id },
            select: { isSuperAdmin: true }
        });

        if (!user || !user.isSuperAdmin) {
            throw new AppError("Acesso restrito a administradores.", 403);
        }

        return next();

    }catch(err){

        if (err instanceof AppError) throw err;

        throw new AppError('Não autorizado', 401)
    }

}