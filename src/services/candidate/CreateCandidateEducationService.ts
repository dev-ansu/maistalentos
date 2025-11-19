import { AppError } from "../../errors/AppError";
import { DegreeLevel } from "../../generated/prisma";
import prisma from "../../prisma";

interface CandidateEducationRequest{
    userId: string;
    institution: string;
    degree: DegreeLevel;
    fieldOfStudy: string;
    startDate: string | Date;
    endDate: string | Date;
    currentlyStudying: boolean;
}

export default class CreateCandidateEducationService{
    
    async execute({currentlyStudying,degree,endDate,fieldOfStudy,institution,startDate,userId}: CandidateEducationRequest){

        const candidate = await prisma.candidateProfile.findUnique({
            where: { userId },
        });

        if (!candidate) {
            throw new AppError("Perfil de candidato não encontrado.");
        }
        const parsedStartDate =
            typeof startDate === "string" ? new Date(startDate) : startDate;
        const parsedEndDate = endDate && typeof endDate === "string" ? new Date(endDate) : endDate;
        
        const education = await prisma.education.create({
            data: {
                candidate: { connect: { id: candidate.id } },
                degree,
                fieldOfStudy,
                institution,
                startDate: parsedStartDate,
                endDate: currentlyStudying ? null : parsedEndDate,
                currentlyStudying: currentlyStudying
            },
        });

        return education;
    }

}