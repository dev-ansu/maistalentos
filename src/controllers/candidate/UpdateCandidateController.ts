import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import UpdateCandidateService from "../../services/candidate/UpdateCandidateService";

export default class UpdateCandidateController{
    
    async handle(req: Request, res: Response){

        const { birthDate, summary, city, state, phone, whatsapp} = req.body;
        const userId = req.user_id;

        const candidateService = new UpdateCandidateService();

        const candidate = candidateService.execute({city, phone, state,userId,whatsapp,birthDate,summary})

        return ApiResponse.success(res, 'Dados atualizados com sucesso.', candidate);        
    }

}