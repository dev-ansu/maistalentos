import { AppError } from "../../errors/AppError";
import prisma from "../../prisma";

interface DeleteExperinceRequest{
    id: string;
    userId: string;
}

export default class DeleteCandidateExperienceService{
    async execute({id, userId}: DeleteExperinceRequest){

        // Deleta somente se pertencer ao usuário
        const deleted = await prisma.experience.deleteMany({
            where: {
                id,
                candidate: {
                    userId
                }
            }
        });

        if (deleted.count === 0) {
            throw new AppError("Esta experiência não pertence ao candidato ou não existe.", 404);
        }

        return deleted;

    }
}