import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import DeleteStateService from "../../services/state/DeleteStateService";

export default class DeleteStateController{

    async handle(req: Request, res: Response){
        
        const { id } = req.params;

        const stateService = new DeleteStateService();

        const state = await stateService.execute({
            id,
        });

        return ApiResponse.success(res, "Estado apagado com sucesso.", state)

    }

}