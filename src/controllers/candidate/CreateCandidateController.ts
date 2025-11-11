import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import CreateCandidateService from "../../services/candidate/CreateCandidateService";


export default class CreateCandidateController{
    
    async handle(req: Request, res: Response){
        
        const userId = req.user_id;

        const candidateService = new CreateCandidateService();

        const candidate = await candidateService.execute({ userId })

        return ApiResponse.success(res, 'Perfil de candidato cadastrado com sucesso.', candidate);        
    }

}