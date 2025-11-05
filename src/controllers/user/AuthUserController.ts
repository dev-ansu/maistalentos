import { Request, Response } from "express";
import AuthUserService from "../../services/user/AuthUserService";
import { ApiResponse } from "../../utils/ApiResponse";

export default class AuthUserController{

    async handle(req: Request, res: Response){
        const { email, password } = req.body;

        const authUserService = new AuthUserService();

        const session = await authUserService.execute({
            email,
            password
        });

        return ApiResponse.success(res, 'Usuário logado com sucesso.', session);

    }

}