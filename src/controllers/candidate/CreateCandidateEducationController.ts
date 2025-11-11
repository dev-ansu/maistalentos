import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import CreateCandidateEducationService from "../../services/candidate/CreateCandidateEducationService";

export default class CreateCandidateEducationController{
    async handle(req: Request, res: Response){
        const { currentlyStudying,degree,endDate,fieldOfStudy,institution,startDate } = req.body;
        
        const userId = req.user_id;
        
        const educationService = new CreateCandidateEducationService();
        
        const education = await educationService.execute({currentlyStudying,degree,endDate,fieldOfStudy,institution,startDate,userId});

        return ApiResponse.success(res, 'Escolaridade cadastrada com sucesso.', education);

    }
}