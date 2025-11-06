import { Request, Response } from "express";
import ListCitiesByStateIdService from "../../services/city/ListCitiesByStateIdService";
import { ApiResponse } from "../../utils/ApiResponse";

export default class ListCitiesByStateIdController{

    async handle(req: Request, res: Response){
        const { stateId } = req.params;

        const listCitiesByStateIdService = new ListCitiesByStateIdService();

        const citiesByStateId = await listCitiesByStateIdService.execute({ stateId })

        return ApiResponse.success(res, 'Sucesso!', citiesByStateId);
    }

}