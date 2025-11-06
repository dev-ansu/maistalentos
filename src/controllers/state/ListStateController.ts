import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import ListStateService from "../../services/state/ListStateService";

export default class ListStateController{
    async handle(req: Request, res: Response){

        const { search } = req.params;

        const stateService = new ListStateService();

        const states = await stateService.execute( 
            { search }
        );

        return ApiResponse.success(res, 'Sucesso!', states);
    }
}