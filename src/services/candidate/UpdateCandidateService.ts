import prisma from "../../prisma";

interface CandidateRequest{
  userId: string;
  birthdate?: Date | string;
  summary?: string;
  city: string;
  state: string;
  phone: string;
  whatsapp: string;
}

export default class UpdateCandidateService{
    async execute({city,phone,state,userId,whatsapp,birthdate,summary}: CandidateRequest){
        
        // ✅ Valida se estado existe
        const stateExists = await prisma.state.findUnique({ where: { id: state } });
        if (!stateExists) {
          throw new Error("Estado inválido.");
        }

        // ✅ Valida se cidade existe
        const cityExists = await prisma.city.findUnique({ where: { id: city } });
        if (!cityExists) {
          throw new Error("Cidade inválida.");
        }

        // ✅ Converte data caso seja string
        const parsedBirthdate =
          typeof birthdate === "string" ? new Date(birthdate) : birthdate;

        // ✅ Upsert → cria se não existir, atualiza se existir
        const candidate = await prisma.candidateProfile.upsert({
          where: { userId },

          create: {
            user: { connect: { id: userId } },
            birthDate: parsedBirthdate,
            summary,
            phone,
            whatsapp,
            state: { connect: { id: state } },
            city: { connect: { id: city } },
          },

          update: {
            birthDate: parsedBirthdate,
            summary,
            phone,
            whatsapp,
            state: { connect: { id: state } },
            city: { connect: { id: city } },
          },

          include: {
            state: true,
            city: true,
            user:{
              select:{
                name: true,
                email: true,
              }
            }
          }
        });

        return candidate;
    }
}