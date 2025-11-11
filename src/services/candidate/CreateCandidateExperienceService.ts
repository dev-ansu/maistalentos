import { AppError } from "../../errors/AppError";
import prisma from "../../prisma";

interface ExperienceRequest{
    userId: string;
    company: string;
    position: string;
    description: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean; 
}

export default class CreateCandidateExperienceService{
    async execute({userId, company,currentlyWorking,description,endDate,position,startDate}: ExperienceRequest){

        const candidate = await prisma.candidateProfile.findUnique({
            where: { userId },
        });

        if (!candidate) {
            throw new AppError("Perfil de candidato não encontrado.");
        }
        const parsedStartDate =
            typeof startDate === "string" ? new Date(startDate) : startDate;
        const parsedEndDate = endDate && typeof endDate === "string" ? new Date(endDate) : endDate;

        const experience = await prisma.experience.create({
            data:{
                candidate: { connect: { id: candidate.id } },
                company,
                description,
                position,
                startDate: parsedStartDate,
                endDate: currentlyWorking ? null : parsedEndDate,
                currentlyWorking: endDate ? false:true,
            }
        });

        return experience;
        
    }
}