import { AppError } from "../../errors/AppError";
import prisma from "../../prisma"

interface StateRequest{
    name: string;
    acronym: string;
}

export default class CreateStateService{
    async execute({name, acronym}: StateRequest){
        
        const stateAlreadyExists = await prisma.state.findFirst({
            where:{
                acronym: acronym,
                name: {
                    equals: name,
                    mode: "insensitive",
                }
            }
        });

        if(stateAlreadyExists) throw new AppError('Este estado já existe.', 409);
        
        const state = await prisma.state.create({
            data:{
                name,
                acronym
            }
        });

        return state;
    }
}