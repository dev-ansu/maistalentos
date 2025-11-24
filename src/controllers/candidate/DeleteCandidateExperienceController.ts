import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import DeleteCandidateExperienceService from "../../services/candidate/DeleteCandidateExperienceService";

export default class DeleteCandidateExperienceController{
    async handle(req: Request, res: Response){
        const { id } = req.params;
        
        const userId = req.user_id;

        const deleteExperienceService = new DeleteCandidateExperienceService();

        const deleted = await deleteExperienceService.execute({id, userId})

        return ApiResponse.success(res, 'Experiência apagada com sucesso.', deleted)
    }
}