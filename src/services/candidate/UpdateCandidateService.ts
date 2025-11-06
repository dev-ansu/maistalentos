import prisma from "../../prisma";

interface CandidateRequest{
  userId: string;
  birthDate?: Date;
  summary?: string;
  resumeUrl?: string;
  city: string;
  state: string;
  phone: string;
  whatsapp: string;
}

export default class UpdateCandidateService{
    async execute(candidate: CandidateRequest){
        
        return { ok: true }
    }
}