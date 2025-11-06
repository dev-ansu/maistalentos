import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";

export default class UpdateCandidateController{
    
    async handle(req: Request, res: Response){

        const candidate = null;

        return ApiResponse.success(res, 'Dados atualizados com sucesso.', candidate);        
    }

}