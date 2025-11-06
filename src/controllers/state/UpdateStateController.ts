import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import UpdateStateService from "../../services/state/UpdateStateService";

export default class UpdateStateController{
    async handle(req: Request, res: Response){

        const { name, acronym } = req.body;
        const { id } = req.params;

        const stateService = new UpdateStateService;

        const state = await stateService.execute({
            id, name, acronym
        });

        return ApiResponse.success(res, 'Estado cadastrado com sucesso.', state)

    }
}