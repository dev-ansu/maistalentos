import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import DeleteCandidateCourseService from "../../services/candidate/DeleteCandidateCourseService";

export default class DeleteCandidateCourseController{
    async handle(req: Request, res: Response){
        const { id } = req.params;
        
        const userId = req.user_id;

        const deleteCourseService = new DeleteCandidateCourseService();

        const deleted = await deleteCourseService.execute({id, userId})

        return ApiResponse.success(res, 'Escolaridade apagada com sucesso.', deleted)
    }
}