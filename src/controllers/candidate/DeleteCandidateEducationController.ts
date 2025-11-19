import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import DeleteCandidateEducationService from "../../services/candidate/DeleteCandidateEducationService";

export default class DeleteCandidateEducationController{
    async handle(req: Request, res: Response){
        const { id } = req.params;
        
        const userId = req.user_id;

        const deleteEducationService = new DeleteCandidateEducationService();

        const deleted = await deleteEducationService.execute({id, userId})

        return ApiResponse.success(res, 'Escolaridade apagada com sucesso.', deleted)
    }
}