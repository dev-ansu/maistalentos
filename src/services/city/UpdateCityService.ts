import { AppError } from "../../errors/AppError";
import prisma from "../../prisma";

interface CityRequest{
    id: string;
    name: string;
    stateId: string;
}

export default class UpdateCityService{
    
    async execute({id, name, stateId}: CityRequest){
        
        const cityExists = await prisma.city.findUnique({
            where:{
                id: id,
            }
        });

        if(!cityExists) throw new AppError('Esta cidade não está cadastrada.');

        
        const stateExists = await prisma.state.findFirst({
            where:{
                id: stateId,
            }
        });

        if(!stateExists) throw new AppError("Este estado não está cadastrado.");

        const cityAlreadyExists = await prisma.city.findFirst({
            where:{
                NOT:{
                    id: id,
                },
                stateId: stateId,
                name:{
                    equals: name,
                    mode: "insensitive",
                }
            }
        });
        

        if(cityAlreadyExists) throw new AppError("Esta cidade já está cadastrada para este estado.");
        
        const city = await prisma.city.update({
            where:{
                id: id,
            },
            data:{
                name: name,
                state: {connect: { id: stateId }}
            }
        });

        return city;

    }

}