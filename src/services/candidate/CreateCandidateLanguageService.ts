import { AppError } from "../../errors/AppError";
import { LanguageProficiency } from "../../generated/prisma";
import prisma from "../../prisma";

interface LanguageRequest{
    userId: string;
    name: string;
    proficiency: LanguageProficiency;
}

export default class CreateCandidateLanguageService{
    async execute({ userId, name, proficiency }: LanguageRequest){

        const candidate = await prisma.candidateProfile.findUnique({
            where: { userId },
        });

        if (!candidate) {
            throw new AppError("Perfil de candidato não encontrado.");
        }
      
        const language = await prisma.language.create({
            data:{
                candidate: { connect: { id: candidate.id } },
                name: name,
                proficiency: proficiency
            }
        });

        return language;

    }
}