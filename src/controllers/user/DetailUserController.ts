import { Request, Response } from "express";

export default class DetailUserController{

    async handle(request: Request, response: Response){
        console.log(request.user_id)
        return response.json({ ok: true })
    }
    
}