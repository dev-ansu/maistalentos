import { z } from "zod"
import escolaridade from "../pages/services/escolaridade"


export const RegistarUsuarioSchema = z.object({
    nome: z.string().min(1, 'Este campo é obrigatório.'),
    nascimento: z.string().date('Data inválida'),
    email: z.string().email('Digite um e-mail válido.'),
    whatsapp: z.string().min(10, "Este campo é obrigatório."),
    telefone:z.string().min(10, "Este campo é obrigatório."),
    escolaridade: z.string().min(1, 'Este campo é obrigatório').refine( value => {
        return escolaridade.escolaridade.some((el => el === value))
    },{message: "Escolha uma das opções da lista."}),
    objetivos: z.array(z.string()).min(3, 'Escolha pelo menos três objetivos.')
})

export type RegistrarUsuarioProps = z.infer<typeof RegistarUsuarioSchema>