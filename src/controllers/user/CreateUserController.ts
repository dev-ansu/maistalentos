import { Request, Response } from "express";
import CreateUserService from "../../services/user/CreateUserService";
import { ApiResponse } from "../../utils/ApiResponse";

export default class CreateUserController{

    async handle(request: Request, response: Response){
        const {name, email, password} = request.body;
        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            email,
            password
        });

        return ApiResponse.success(response, 'Usuário criado com sucesso.', user, 201);

    }

}