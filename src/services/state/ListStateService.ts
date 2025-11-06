import prisma from "../../prisma";

export default class ListStateService{
    
    async execute({ search }: { search?: string}){

        if(!search){
            const states = await prisma.state.findMany();
            return states;
        }

        const states = await prisma.state.findMany({
            where:{
                OR:[
                    {
                        acronym:{
                            contains: search,
                            mode: "insensitive"
                        }
                    },
                    {
                        name:{
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                ]
            }
        });

        return states;


    }
}