import { AppError } from "../../errors/AppError";
import prisma from "../../prisma";

export default class DetailUserService{
    async execute({ userId }: { userId: string }){

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include:{
                candidate: {
                    include: {
                        city: true,
                        state: true,
                        education: true,
                    }
                },
                company: true,
                role: true,
            },
            omit:{
                password: true,
            }
        });

        if(!user) throw new AppError("Este usuário não existe.", 404);

        return user;
    }
}