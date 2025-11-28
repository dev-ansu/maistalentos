import { AppError } from "../../errors/AppError";
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

      // Buscar o perfil existente (se houver)
        const existingCandidateProfile = await prisma.candidateProfile.findUnique({
            where: { userId }
        });

        // VERIFICAÇÃO DE DUPLICAÇÃO - Só verifica se os dados mudaram
        if (existingCandidateProfile) {
            // UPDATE: Verificar apenas se os campos únicos foram modificados
            if (existingCandidateProfile.phone !== phone) {
                const phoneExists = await prisma.candidateProfile.findFirst({
                    where: {
                        phone: phone,
                        userId: { not: userId }
                    }
                });
                if (phoneExists) throw new AppError("Telefone já está em uso por outro candidato.");
            }

            if (existingCandidateProfile.whatsapp !== whatsapp) {
                const whatsappExists = await prisma.candidateProfile.findFirst({
                    where: {
                        whatsapp: whatsapp,
                        userId: { not: userId }
                    }
                });
                if (whatsappExists) throw new AppError("WhatsApp já está em uso por outro candidato.");
            }
        } else {
            // CREATE: Verificar todos os campos únicos
            const existingCandidateWithSameContact = await prisma.candidateProfile.findFirst({
                where: {
                    OR: [
                        { phone: phone },
                        { whatsapp: whatsapp }
                    ]
                }
            });

            if (existingCandidateWithSameContact) {
                if (existingCandidateWithSameContact.phone === phone) {
                    throw new AppError("Telefone já está em uso por outro candidato.");
                }
                if (existingCandidateWithSameContact.whatsapp === whatsapp) {
                    throw new AppError("WhatsApp já está em uso por outro candidato.");
                }
            }
        }
        
        // ✅ Valida se estado existe
        const stateExists = await prisma.state.findUnique({ where: { id: state } });
        if (!stateExists) {
          throw new AppError("Estado inválido.");
        }

        // ✅ Valida se cidade existe
        const cityExists = await prisma.city.findUnique({ where: { id: city } });
        if (!cityExists) {
          throw new AppError("Cidade inválida.");
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