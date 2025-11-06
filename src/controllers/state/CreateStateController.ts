import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import CreateStateService from "../../services/state/CreateStateService";

export default class CreateStateController{
    async handle(req: Request, res: Response){

        const { name, acronym } = req.body;

        const stateService = new CreateStateService;

        const state = await stateService.execute({
            name, acronym
        });

        return ApiResponse.success(res, 'Estado cadastrado com sucesso.', state)

    }
}