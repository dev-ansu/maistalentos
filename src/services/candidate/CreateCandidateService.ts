import { AppError } from "../../errors/AppError";
import prisma from "../../prisma";

export default class CreateCandidateService{
    async execute({ userId }: { userId: string}){

       const exists = await prisma.candidateProfile.findFirst({
         where: { userId }
       });

       if (exists) {
         throw new AppError("Perfil de candidato já existe.");
       }

       const candidate = await prisma.candidateProfile.create({
          data:{
            userId
          }
       });

        return candidate;
      }
}