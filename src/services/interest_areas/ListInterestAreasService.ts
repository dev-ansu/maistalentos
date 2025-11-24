import prisma from "../../prisma";

export default class ListInterestAreasService{
    async execute(){
        
        const interestAreas = await prisma.interestArea.findMany();

        return interestAreas;

    }
}