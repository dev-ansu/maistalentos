import prisma from "../../prisma";

export default class ListCitiesByStateIdService{
    
    async execute({ stateId }: { stateId: string}){
        
        const cities = await prisma.city.findMany({
            where:{
                stateId: stateId,
            }
        });

        return cities;

    }

}