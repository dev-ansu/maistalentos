import logo from "../../assets/img/maistalentos.png";
import Input, { InputM } from "../../components/Input";
import objetivos from "../services/objetivos";
import escolaridade from "../services/escolaridade";
import { db } from "../services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RegistarUsuarioSchema, RegistrarUsuarioProps } from "../../schemas/RegistarUsuarioSchema";
import { zodResolver } from "@hookform/resolvers/zod";


const Register = ()=>{

    const {register, formState: {errors}, handleSubmit, reset} = useForm<RegistrarUsuarioProps>({
        mode: "all",
        criteriaMode:"all",
        resolver: zodResolver(RegistarUsuarioSchema),
    });
    

    const cadastrarUsuario = async (data:RegistrarUsuarioProps)=>{
        try{
            await addDoc(collection(db, 'candidatos'), data);
            toast.success("Registro salvo com sucesso!");
            reset();
        }catch(err: any){
            toast.error("Não foi possível salvar os dados. Tente novamente mais tarde.")
        }
    }

    return(
        <div className="flex flex-col p-4 bg-white shadow-md rounded-md w-full max-w-4xl">
            <img src={logo} width={200} className="" />
            <h1 className="flex flex-col">
                <span className="text-4xl font-semibold">
                    Cadastre-se
                </span>
                <span className="p-0.5 bg-orange-500 rounded-sm w-10"></span>
            </h1>

            <form onSubmit={handleSubmit(cadastrarUsuario)} className="flex w-full flex-col gap-8 mt-8">

                <div className="flex flex-col w-full gap-2">
                    <p className="border-b text-xl border-b-orange-500">Informações pessoais</p>
                    <div className="flex gap-4">
                    <div className="flex flex-col w-full">
                        <label htmlFor="">Nome completo</label>
                        <Input 
                            error={errors.nome?.message}
                            register={register("nome")} 
                            placeholder="Digite seu nome completo" 
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="">Data de nascimento</label>
                        <Input error={errors.nascimento?.message} register={register("nascimento")} type="date" />
                    </div>
                    </div>
                </div>

                <div className="flex flex-col w-full gap-4">
                    <p className="border-b text-xl border-b-orange-500">Informações de contato</p>
                    <div className="flex gap-4 w-full">
                        <div className="flex flex-col w-full">
                            <label htmlFor="">E-mail</label>
                            <Input error={errors.email?.message} register={register("email")} placeholder="Digite seu e-mail" type="email" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="">WhatsApp</label>
                            <InputM placeholder="Digite WhatsApp" 
                                showMask={true}
                                error={errors.whatsapp?.message}
                                mask="(__) ____-____" 
                                replacement={{ _: /\d/ }} 
                                register={register("whatsapp")}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="">Telefone</label>
                            <InputM placeholder="Digite telefone" 
                                showMask={true}
                                error={errors.telefone?.message}
                                mask="(__) _____-____" 
                                replacement={{ _: /\d/ }} 
                                register={register("telefone")}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full gap-4">
                    <p className="border-b text-xl border-b-orange-500">Informações acadêmicas</p>
                    <div className="flex flex-col gap-4 w-full">
                        <label htmlFor="">Escolaridade</label>
                        <select {...register("escolaridade")} defaultValue="Escolha uma opção" className="w-full h-8 outline-none border rounded-md border-orange-600">
                            <option value="">Escolha uma opção</option>
                            {escolaridade.escolaridade.map( escolaridade =>(
                                <option key={escolaridade} value={escolaridade}>{escolaridade}</option>
                            ))}
                        </select>
                        {errors?.escolaridade && <span>{errors.escolaridade?.message}</span>}
                    </div>
                </div>

                <div className="flex flex-col w-full gap-4">
                    <p className="border-b text-xl border-b-orange-500">Informações profissionais</p>
                    <p>Escolha pelo menos três opções.</p>
                    <div className="flex flex-wrap gap-4 w-full">
                        {objetivos.objetivos.map(objetivo => (
                            <label key={objetivo}>
                            {objetivo}
                            <Input
                                
                                register={register("objetivos")}
                                defaultValue={objetivo}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                                type="checkbox"
                                />
                            </label>
                        ))}
                    </div>
                    {errors?.objetivos && <span>{errors.objetivos?.message}</span>}
                </div>

                <button className="border-none outline-none bg-orange-500 rounded-sm py-2 px-1 text-white mt-4">Cadastrar</button>
            </form>
        </div>
    )
}

export default Register;