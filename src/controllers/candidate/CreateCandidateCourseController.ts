import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import CreateCandidateCourseService from "../../services/candidate/CreateCandidateCourseService";

export default class CreateCandidateCourseController{

    async handle(req: Request, res: Response){
        const {completionDate,hours,institution,title} = req.body;
        
        const userId = req.user_id;
        
        const courseService = new CreateCandidateCourseService();
        
        const course = await courseService.execute({completionDate,hours,institution,title,userId});
        
        return ApiResponse.success(res, "Curso cadastrado com sucesso.", course);
    }

}