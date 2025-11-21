import { AppError } from "../../errors/AppError";
import prisma from "../../prisma";

interface DeleteCourseRequest{
    id: string;
    userId: string;
}

export default class DeleteCandidateCourseService{
    async execute({id, userId}: DeleteCourseRequest){

        // Deleta somente se pertencer ao usuário
        const deleted = await prisma.course.deleteMany({
            where: {
                id,
                candidate: {
                    userId
                }
            }
        });

        if (deleted.count === 0) {
            throw new AppError("Este curso não pertence ao candidato ou não existe.", 404);
        }

        return deleted;

    }
}