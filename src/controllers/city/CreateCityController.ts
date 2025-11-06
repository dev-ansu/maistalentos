import { Request, Response } from "express";
import CreateCityService from "../../services/city/CreateCityService";
import { ApiResponse } from "../../utils/ApiResponse";

export default class CreateCityController{
    async handle(req: Request, res: Response){

        const { name, stateId } = req.body;

        const cityService = new CreateCityService();

        const city = await cityService.execute({
            name,
            stateId,
        });

        return ApiResponse.success(res, "Cidade criada com sucesso.", city);
        
    }
}