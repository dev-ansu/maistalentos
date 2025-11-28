import { AppError } from "../../errors/AppError";
import prisma from "../../prisma";


export default class CreateCompanyProfileService{
    async execute({userId, name, cityId,cnpj,contactEmail,description,companyInterest,isActive,phone,stateId,facebook,instagram,linkedin,website}: CreateCompanyProfileRequest){
        

        // Buscar o perfil existente (se houver)
        const existingCompanyProfile = await prisma.companyProfile.findUnique({
            where: { userId }
        });

        // VERIFICAÇÃO DE DUPLICAÇÃO - Só verifica se os dados mudaram
        if (existingCompanyProfile) {
            // UPDATE: Verificar apenas se os campos únicos foram modificados
            if (existingCompanyProfile.contactEmail !== contactEmail) {
                const emailExists = await prisma.companyProfile.findFirst({
                    where: {
                        contactEmail: contactEmail,
                        userId: { not: userId }
                    }
                });
                if (emailExists) throw new AppError("E-mail já está em uso por outra empresa.");
            }

            if (existingCompanyProfile.phone !== phone) {
                const phoneExists = await prisma.companyProfile.findFirst({
                    where: {
                        phone: phone,
                        userId: { not: userId }
                    }
                });
                if (phoneExists) throw new AppError("Telefone já está em uso por outra empresa.");
            }

            if (existingCompanyProfile.cnpj !== cnpj) {
                const cnpjExists = await prisma.companyProfile.findFirst({
                    where: {
                        cnpj: cnpj,
                        userId: { not: userId }
                    }
                });
                if (cnpjExists) throw new AppError("CNPJ já está em uso por outra empresa.");
            }
        } else {
            // CREATE: Verificar todos os campos únicos
            const existingCompanyWithSameContact = await prisma.companyProfile.findFirst({
                where: {
                    OR: [
                        { contactEmail: contactEmail },
                        { phone: phone },
                        { cnpj: cnpj }
                    ]
                }
            });

            if (existingCompanyWithSameContact) {
                if (existingCompanyWithSameContact.contactEmail === contactEmail) {
                    throw new AppError("E-mail já está em uso por outra empresa.");
                }
                if (existingCompanyWithSameContact.phone === phone) {
                    throw new AppError("Telefone já está em uso por outra empresa.");
                }
                if (existingCompanyWithSameContact.cnpj === cnpj) {
                    throw new AppError("CNPJ já está em uso por outra empresa.");
                }
            }
        }

        // Verificar se as áreas de interesse existem

        if (companyInterest && companyInterest.length > 0) {
            const existingcompanyInterest = await prisma.interestArea.findMany({
                where: {
                    id: {
                        in: companyInterest
                    }
                },
                select: {
                    id: true
                }
            });

            if (existingcompanyInterest.length !== companyInterest.length) {
                throw new AppError("Uma ou mais áreas de interesse não foram encontradas.");
            }
        }

        // Usar transaction para garantir que tudo seja criado corretamente
        const companyProfile = await prisma.$transaction(async (tx) => {
            // Primeiro criar o companyProfile
            const profile = await tx.companyProfile.upsert({
                where: {
                    userId,
                },
                update: {
                    cnpj,
                    name,
                    cityId: cityId[0],
                    stateId: stateId[0],
                    contactEmail,
                    phone,
                    description,
                    facebook,
                    instagram,
                    linkedin,
                    website,
                    isActive,
                },
                create: {
                    cnpj,
                    name,
                    cityId: cityId[0],
                    stateId: stateId[0],
                    contactEmail,
                    phone,
                    instagram,
                    website,
                    facebook,
                    linkedin,
                    description,
                    userId,
                    isActive,
                },
            });

            // Depois criar as relações na tabela de junção CompanyInterest
            if (companyInterest && companyInterest.length > 0) {

                // PRIMEIRO: Deletar relações existentes (importante para update)
                await tx.companyInterest.deleteMany({
                    where: {
                        companyId: profile.id
                    }
                });

                await tx.companyInterest.createMany({
                    data: companyInterest.map(interestId => ({
                        companyId: profile.id,
                        interestId: interestId
                    })),
                    // skipDuplicates: true
                });
            }

            // Retornar o perfil com as áreas de interesse
            return await tx.companyProfile.findUnique({
                where: { id: profile.id },
                include: {
                    companyInterest: {
                        include: {
                            interest: true
                        }
                    }
                }
            });
        });
        
        return companyProfile;

    }
}


interface CreateCompanyProfileRequest{
    userId: string;
    name: string;
    cnpj: string;
    description: string;
    isActive: boolean;
    phone: string;
    contactEmail: string;
    stateId: string[];
    cityId: string[];
    companyInterest: string[];
    website?: string | undefined;
    instagram?: string | undefined;
    facebook?: string | undefined;
    linkedin?: string | undefined;
}