import { AppError } from "../../errors/AppError";
import prisma from "../../prisma"

interface StateRequest{
    id: string;
    name: string;
    acronym: string;
}

export default class UpdateStateService{
    async execute({id, name, acronym}: StateRequest){
        
        const stateExists = await prisma.state.findUnique({
            where:{
                id: id,
            }
        });

        const stateAlreadyExists = await prisma.state.findFirst({
            where:{
                id: { not: id }, 
                OR:[
                    
                    {
                        acronym: {
                            equals: acronym,
                            mode: "insensitive"
                        },
                    },
                    {
                        name:{
                            equals: name,
                            mode: "insensitive",
                        }
                    }
                    
                ]
                
            }
        });
        
        if(!stateExists) throw new AppError('Este estado não está cadastrado.', 409);

        if (stateAlreadyExists) {
            throw new AppError('Já existe um estado com esse nome ou sigla.', 409);
        }

        
        const state = await prisma.state.update({
            where:{
                id: id,
            },
            data:{
                name,
                acronym
            }
        });

        return state;
    }
}