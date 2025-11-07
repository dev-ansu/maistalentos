import { Request, Response } from "express";
import UpdateCityService from "../../services/city/UpdateCityService";
import { ApiResponse } from "../../utils/ApiResponse";

export default class UpdateCityController{
    
    async handle(req: Request, res: Response){
        const { name, stateId } = req.body;
        const { id } = req.params;

        const updateCityService = new UpdateCityService();

        const city = await updateCityService.execute({ id, name, stateId })

        return ApiResponse.success(res, "Cidade atualizada com sucesso.", city);
    }

}