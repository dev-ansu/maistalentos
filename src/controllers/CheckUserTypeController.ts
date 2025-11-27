import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import prisma from "../prisma";
import { ApiResponse } from "../utils/ApiResponse";

const allowedRoutes = {
    candidate: ["dashboard","curriculo" ,"candidaturas"],
    company: ["dashboard", "perfil"]
};

export default class CheckUserTypeController{
    async handle(req: Request, res: Response){
        const userId = req.user_id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { userType: true }
        });

        if (!user) {
            throw new AppError('Usuário não encontrado.', 404);
        }

        const { path } = req.query;

        console.log(path)

        const canAccess = allowedRoutes[user.userType]?.includes(path as string);
        console.log(canAccess)
        return ApiResponse.success(res, 'Sucesso', {
            userType: user.userType,
            allowed: !!canAccess
        })

    }
}