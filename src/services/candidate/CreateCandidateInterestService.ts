import { AppError } from "../../errors/AppError";
import prisma from "../../prisma";

interface CandidateInterestRequest{
    userId: string;
    interest: string;
}

export default class CreateCandidateInterestService{
    async execute({ interest, userId }: CandidateInterestRequest){
        
        const candidate = await prisma.candidateProfile.findUnique({
            where: { userId },
        });

        if (!candidate) {
            throw new AppError("Perfil de candidato não encontrado.");
        }

        const interestAlreadyExists = await prisma.candidateInterest.findUnique({
            where:{
                candidateId_interestId:{
                    candidateId: candidate.id,
                    interestId: interest,
                }
            }
        });
        
        if(interestAlreadyExists) throw new AppError("Esta área de interesse já está cadastrada. Tente uma nova.");

        const candidateInterest = await prisma.candidateInterest.create({
            data:{
                candidate: { connect: { id: candidate.id } },
                interest: { connect: { id: interest }}
            },
            select:{
                interest: true,
            }
        });


        return candidateInterest;
    }
}