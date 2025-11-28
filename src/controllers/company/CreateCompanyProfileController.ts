import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import CreateCompanyProfileService from "../../services/company/CreateCompanyProfileService";

export default class CreateCompanyProfileController{
    async handle(req: Request, res: Response){

        const userId = req.user_id;
        const { cityId,cnpj,contactEmail,description,companyInterest,isActive,name,phone,stateId,facebook,instagram,linkedin,website } = req.body;

        const companyProfileService = new CreateCompanyProfileService();

        const companyProfile = await companyProfileService.execute({
            cityId,cnpj,contactEmail,description,companyInterest,isActive,name,phone,stateId,facebook,instagram,linkedin,website, userId
        })

        return ApiResponse.success(res, 'Dados cadastrados com sucesso.', companyProfile)

    }
}