import { 
  WorkModel, 
  JobStatus, 
  ApplicationStatus,
  DegreeLevel, 
  LanguageProficiency, 
  UserType,
  Gender,
  CompanySize,
  VerificationStatus,
  Ethnicity
} from "../generated/prisma";
import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";

export default class ListEnumsController {
    async handle(req: Request, res: Response) {
        return ApiResponse.success(res, 'Sucesso', 
            {
                // 💼 JOB ENUMS
                WorkModel: formatEnum(WorkModel),
                JobStatus: formatEnum(JobStatus),
                ApplicationStatus: formatEnum(ApplicationStatus),
                
                // 🎓 EDUCATION ENUMS  
                DegreeLevel: formatEnum(DegreeLevel),
                
                // 🌐 LANGUAGE ENUMS
                LanguageProficiency: formatEnum(LanguageProficiency),
                
                // 👥 USER ENUMS
                UserType: formatEnum(UserType),
                
                // 👤 CANDIDATE ENUMS
                Gender: formatEnum(Gender),
                Ethnicity: formatEnum(Ethnicity),
                
                // 🏢 COMPANY ENUMS
                CompanySize: formatEnum(CompanySize),
                VerificationStatus: formatEnum(VerificationStatus)
            }
        );
    }
}

const formatEnum = (enumObj: any) => {
  return Object.values(enumObj).map(value => ({
    value,
    label: formatLabel(value as string)
  }));
};

const formatLabel = (value: string): string => {
  // Objetos separados por categoria para evitar chaves duplicadas
  const jobLabels: { [key: string]: string } = {
    // JOB TYPE
    'presencial': 'Presencial',
    'hibrido': 'Híbrido', 
    'remoto': 'Remoto',
    
    // JOB STATUS
    'open': 'Aberta',
    'paused': 'Pausada', 
    'closed': 'Fechada'
  };

  const applicationLabels: { [key: string]: string } = {
    'pending': 'Pendente',
    'accepted': 'Aceita',
    'rejected': 'Rejeitada'
  };

  const educationLabels: { [key: string]: string } = {
    'fundamental': 'Fundamental',
    'medio': 'Ensino Médio',
    'tecnico': 'Técnico',
    'superior_completo': 'Superior Completo',
    'superior_incompleto': 'Superior Incompleto',
    'pos_graduacao': 'Pós-Graduação',
    'mestrado': 'Mestrado',
    'doutorado': 'Doutorado'
  };

  const languageLabels: { [key: string]: string } = {
    'basico': 'Básico',
    'intermediario': 'Intermediário', 
    'avancado': 'Avançado',
    'fluente': 'Fluente',
    'nativo': 'Nativo'
  };

  const userLabels: { [key: string]: string } = {
    'candidate': 'Candidato',
    'company': 'Empresa'
  };

  const genderLabels: { [key: string]: string } = {
    'male': 'Masculino',
    'female': 'Feminino', 
    'non_binary': 'Não Binário',
    'other': 'Outro',
    'prefer_not_to_say': 'Prefiro não dizer'
  };

  const ethnicityLabels: { [key: string]: string } = {
    'white': 'Branco',
    'black': 'Preto',
    'brown': 'Pardo',
    'indigenous': 'Indígena',
    'asian': 'Asiático', 
    'other': 'Outro',
    'prefer_not_to_say': 'Prefiro não dizer'
  };

  const companyLabels: { [key: string]: string } = {
    'micro': 'Microempresa',
    'small': 'Pequena Empresa',
    'medium': 'Média Empresa',
    'large': 'Grande Empresa', 
    'enterprise': 'Empresarial'
  };

  const verificationLabels: { [key: string]: string } = {
    'pending': 'Pendente',
    'approved': 'Aprovada', 
    'rejected': 'Rejeitada',
    'under_review': 'Em Análise'
  };

  // Busca em todos os objetos (ordem de prioridade)
  return jobLabels[value] || 
         applicationLabels[value] ||
         educationLabels[value] ||
         languageLabels[value] ||
         userLabels[value] ||
         genderLabels[value] ||
         ethnicityLabels[value] || 
         companyLabels[value] ||
         verificationLabels[value] ||
         value; // fallback para caso não encontre
};