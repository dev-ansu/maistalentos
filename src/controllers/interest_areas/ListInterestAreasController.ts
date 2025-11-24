import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import ListInterestAreasService from "../../services/interest_areas/ListInterestAreasService";

export default class ListInterestAreasController{
    async handle(req: Request, res: Response){
        
        const userId = req.user_id;

        const interestAreasService = new ListInterestAreasService();

        const interestAreas = await interestAreasService.execute();

        return ApiResponse.success(res, "Sucesso!", interestAreas);

    }
}