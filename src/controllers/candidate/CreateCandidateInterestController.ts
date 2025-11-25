import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import CreateCandidateInterestService from "../../services/candidate/CreateCandidateInterestService";

export default class CreateCandidateInterestController{

    async handle(req: Request, res: Response){

        const { interest } = req.body;

        const userId = req.user_id;

        const interestAreaService = new CreateCandidateInterestService();

        const interestResponse = await interestAreaService.execute({interest, userId});

        return ApiResponse.success(res, "Área de interesse cadastrada com sucesso!", interestResponse);

    }

}