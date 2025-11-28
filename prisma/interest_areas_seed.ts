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
      {name: "Serviços Gerais"},
      {name: "Engenharia Civil"},
      {name: "Engenharia Mecânica"},
      {name: "Engenharia Elétrica"},
      {name: "Engenharia de Produção"},
      {name: "Arquitetura e Urbanismo"},
      {name: "Manutenção Industrial"},
      {name: "Qualidade e Segurança"},
      {name: "Produção Industrial"},
      {name: "Metalurgia"},
      {name: "Química"},
      {name: "Jurídico"},
      {name: "Comunicação e Mídia"},
      {name: "Pesquisa e Desenvolvimento"},
      {name: "Planejamento Estratégico"},
      {name: "Auditoria e Controladoria"},
      {name: "Comércio Exterior"},
      {name: "Compliance"},
      {name: "Gestão de Projetos"},
      {name: "Business Intelligence"},
      {name: "Dados e Analytics"},
      {name: "Design Gráfico"},
      {name: "Design de Produto"},
      {name: "Publicidade e Propaganda"},
      {name: "Artes e Cultura"},
      {name: "Moda"},
      {name: "Produção Audiovisual"},
      {name: "UX/UI Design"},
      {name: "Fotografia"},
      {name: "Game Design"},
      {name: "Consultoria"},
      {name: "Treinamento e Desenvolvimento"},
      {name: "Eventos e Cerimonial"},
      {name: "Hotelaria e Turismo"},
      {name: "Gastronomia e Alimentação"},
      {name: "Beleza e Estética"},
      {name: "Esportes e Fitness"},
      {name: "Varejo e Atacado"},
      {name: "Transporte e Mobilidade"},
      {name: "Meio Ambiente e Sustentabilidade"},
      {name: "Enfermagem"},
      {name: "Farmácia"},
      {name: "Medicina"},
      {name: "Psicologia"},
      {name: "Fisioterapia"},
      {name: "Nutrição"},
      {name: "Odontologia"},
      {name: "Biomedicina"},
      {name: "Veterinária"},
      {name: "Desenvolvimento de Software"},
      {name: "Infraestrutura e Redes"},
      {name: "Segurança da Informação"},
      {name: "Cloud Computing"},
      {name: "Inteligência Artificial"},
      {name: "DevOps"},
      {name: "Banco de Dados"},
      {name: "Suporte Técnico"},
      {name: "Product Management"},
      {name: "Agile e Scrum"}
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



