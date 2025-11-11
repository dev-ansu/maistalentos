import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import CreateCandidateExperienceService from "../../services/candidate/CreateCandidateExperienceService";

export default class CreateCandidateExperienceController{
    
    async handle(req: Request, res: Response){

        const {company, position, description, startDate, endDate, currentlyWorking} = req.body;

        const userId = req.user_id

        const experienceService = new CreateCandidateExperienceService();

        const experience = await experienceService.execute({userId, company, position, description, startDate, endDate, currentlyWorking});

        return ApiResponse.success(res, 'Experiência cadastrada com sucesso.', experience)
    }
}