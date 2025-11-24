import { AppError } from "../../errors/AppError";
import prisma from "../../prisma";

interface DeleteLanguageRequest{
    id: string;
    userId: string;
}

export default class DeleteCandidateLanguageService{
    async execute({id, userId}: DeleteLanguageRequest){

        // Deleta somente se pertencer ao usuário
        const deleted = await prisma.language.deleteMany({
            where: {
                id,
                candidate: {
                    userId
                }
            }
        });

        if (deleted.count === 0) {
            throw new AppError("Este idioma não pertence ao candidato ou não existe.", 404);
        }

        return deleted;

    }
}