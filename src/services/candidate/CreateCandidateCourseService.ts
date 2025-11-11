import { AppError } from "../../errors/AppError";
import prisma from "../../prisma";

interface CourseRequest{
    userId: string;
    title: string;
    institution: string;
    hours: number;
    completionDate: string | Date;
}

export default class CreateCandidateCourseService{
    
    async execute({completionDate,hours,institution,title,userId}: CourseRequest){

        const candidate = await prisma.candidateProfile.findUnique({
                    where: { userId },
                });
        
        if (!candidate) {
            throw new AppError("Perfil de candidato não encontrado.");
        }
        const parsedCompletionDate =
            typeof completionDate === "string" ? new Date(completionDate) : completionDate;

        const course = await prisma.course.create({
            data: {
                candidate: { connect: { id: candidate.id } },
                title,
                completionDate: parsedCompletionDate,
                hours: hours,
                institution,
            },
        });

        return course;
    }
}