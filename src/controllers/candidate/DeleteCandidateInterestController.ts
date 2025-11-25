import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import DeleteCandidateInterestService from "../../services/candidate/DeleteCandidateInterestService";

export default class DeleteCandidateInterestController{
    async handle(req: Request, res: Response){
        const { id } = req.params;
        
        const userId = req.user_id;

        const deleteInterestService = new DeleteCandidateInterestService();

        const deleted = await deleteInterestService.execute({id, userId})

        return ApiResponse.success(res, 'Experiência apagada com sucesso.', deleted)
    }
}