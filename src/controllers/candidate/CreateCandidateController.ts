import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import CreateCandidateService from "../../services/candidate/CreateCandidateService";
import { AppError } from "../../errors/AppError";


export default class CreateCandidateController{
    
    async handle(req: Request, res: Response){
        
        const { id } = req.params;

        const userId = req.user_id;
      
        if(userId != id) throw new AppError("Os ids devem ser iguais.");

        const candidateService = new CreateCandidateService();

        const candidate = await candidateService.execute({ userId })

        return ApiResponse.success(res, 'Perfil de candidato cadastrado com sucesso.', candidate);        
    }

}