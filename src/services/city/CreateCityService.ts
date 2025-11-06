import { AppError } from "../../errors/AppError";
import prisma from "../../prisma";

interface CityRequest{
    name: string;
    stateId: string;
}

export default class CreateCityService{
    async execute({name, stateId}: CityRequest){
        
        const cityAlreadyExists = await prisma.city.findFirst({
            where:{
                name: {
                    equals: name,
                    mode: "insensitive",
                },
                stateId: stateId
            }
        });

        if(cityAlreadyExists) throw new AppError('Esta cidade já existe para o estado escolhido.', 409);

        const city = await prisma.city.create({
            data:{
                name,
                state: {
                    connect: {id: stateId}
                }
            },
        });
        
        return city;
    }
}