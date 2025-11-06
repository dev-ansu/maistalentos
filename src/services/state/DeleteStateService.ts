import { AppError } from "../../errors/AppError";
import prisma from "../../prisma";

interface DeleteStateRequest{
    id: string;
}

export default class DeleteStateService{

    async execute({ id }: DeleteStateRequest){

        const stateFind = await prisma.state.findUnique({
            where:{
                id: id,
            },
            include: {
                cities: true,
            }
        });

        if(!stateFind) throw new AppError('Este estado não está cadastrado.', 409);

        if(stateFind.cities.length > 0){
            throw new AppError(
                "Não é possível excluir este estado, pois existem cidades associadas.",
                409
            );
        }

        const state = await prisma.state.delete({
            where:{
                id: id,
            },
        });

        return state;
    }

}