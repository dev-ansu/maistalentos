import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import CreateCandidateLanguageService from "../../services/candidate/CreateCandidateLanguageService";

export default class CreateCandidateLanguageController{
    async handle(req: Request, res: Response){
        const { name, proficiency } = req.body;

        const userId = req.user_id;
        
        const createLanguageService = new CreateCandidateLanguageService();

        const language = await createLanguageService.execute({name, proficiency, userId});

        return ApiResponse.success(res, "Idioma inserido com sucesso.", language)
    }
}