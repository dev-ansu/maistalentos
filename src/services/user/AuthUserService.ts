import { compare } from "bcryptjs";
import { AppError } from "../../errors/AppError";
import prisma from "../../prisma";
import {sign} from "jsonwebtoken"

interface AuthUserRequest{
    email: string;
    password: string;
}

export default class AuthUserService{
    async execute({email, password}: AuthUserRequest){
        
        const user = await prisma.user.findFirst({
            where:{
                email: email,
            },
            include:{
                role: true,
                candidate: true,
            }
        });

        if(!user) throw new AppError('Usuário não encontrado.', 401);
        
        const passwordMatch = await compare(password, user?.password)
        
        if(!passwordMatch) throw new AppError('Dados incorretos. Por favor, tente novamente.', 401);

        const token = sign(
            {
                name: user.name,
                email: user.email,
                role: user.role?.name,
                isSuperAdmin: user.isSuperAdmin
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn:'30d',
            }
        )
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            isSuperAdmin: user.isSuperAdmin,
            role: user.role?.name,
            token: token,
            candidate: user.candidate,
        };
    }
}