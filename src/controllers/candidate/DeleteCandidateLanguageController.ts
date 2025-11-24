import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import DeleteCandidateLanguageService from "../../services/candidate/DeleteCandidateLanguageService";

export default class DeleteCandidateLanguageController{
    async handle(req: Request, res: Response){
        const { id } = req.params;
        
        const userId = req.user_id;

        const deleteLanguageService = new DeleteCandidateLanguageService();

        const deleted = await deleteLanguageService.execute({id, userId})

        return ApiResponse.success(res, 'Idioma apagado com sucesso.', deleted)
    }
}