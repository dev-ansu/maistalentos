import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

export const interestAreasSeed = async()=>{
    const interestAreas = [
      {name: "Administrativo"},
      {name: "Comercial e Vendas"},
      {name: "Telemarketing / Call Center"},
      {name: "Tecnologia da Informação"},
      {name: "Financeiro / Contabilidade"},
      {name: "Recursos Humanos / DP"},
      {name: "Marketing"},
      {name: "Logística / Operacional"},
      {name: "Educação"},
      {name: "Saúde"},
      {name: "Serviços Gerais"}
    ]

    
    for(const interestArea of interestAreas){
        await prisma.interestArea.upsert({
        where: { name: interestArea.name },
        update: {},
        create: interestArea
        })
    }

    console.log('Interest areas created.')
}



