import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService{
    async execute({name,email,password}: UserRequest){
        
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email,
            }
        });

        if(userAlreadyExists){
            throw new AppError('E-mail já está em uso.', 409) // 409 conflict
        }
        
        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data:{
                name,
                email,
                password: passwordHash,
            },
            omit: { password: true }
        })
        
        return user;
    }
}