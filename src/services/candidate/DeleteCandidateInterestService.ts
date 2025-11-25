import { AppError } from "../../errors/AppError";
import prisma from "../../prisma";

interface DeleteCandidateInterestRequest{
    id: string;
    userId: string;
}

export default class DeleteCandidateInterestService{
    async execute({id, userId}: DeleteCandidateInterestRequest){

        // Deleta somente se pertencer ao usuário
        const deleted = await prisma.candidateInterest.deleteMany({
            where: {
                id: id,
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