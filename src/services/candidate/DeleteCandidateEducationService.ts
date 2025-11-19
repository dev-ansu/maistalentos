import { AppError } from "../../errors/AppError";
import prisma from "../../prisma";

interface DeleteEducationRequest{
    id: string;
    userId: string;
}

export default class DeleteCandidateEducationService{
    async execute({id, userId}: DeleteEducationRequest){

        // Deleta somente se pertencer ao usuário
        const deleted = await prisma.education.deleteMany({
            where: {
                id,
                candidate: {
                    userId
                }
            }
        });

        if (deleted.count === 0) {
            throw new AppError("Esta escolaridade não pertence ao candidato ou não existe.", 404);
        }

        return deleted;

    }
}