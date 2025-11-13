import { Request, Response } from "express";
import DetailUserService from "../../services/user/DetailUserService";
import { ApiResponse } from "../../utils/ApiResponse";

export default class DetailUserController{

    async handle(req: Request, res: Response){
        
        const userId = req.user_id;

        const detailUserService = new DetailUserService();

        const user = await detailUserService.execute({ userId })

        return ApiResponse.success(res, "Sucesso!", user);
    }
    
}