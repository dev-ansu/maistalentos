import { body } from "express-validator"

export const updateCandidateValidation = [
    body("birthdate").notEmpty().withMessage("Data de nascimento é obrigatória.").isISO8601().withMessage("Digite uma data válida no formato YYYY-MM-DD."),
    body("summary").trim().optional(),
    
    body("phone").notEmpty().withMessage("O telefone é obrigatório.")
    .matches(/^\d*$/).withMessage("O telefone deve conter apenas números.")
    .isLength({min: 10, max: 11}).withMessage("O telefone deve ter entre 10 e 11 caracteres."),

    body("whatsapp").notEmpty().withMessage("O whatsapp é obrigatório.")
    .matches(/^\d*$/).withMessage("O whatsapp deve conter apenas números.")
    .isLength({min: 10, max: 11}).withMessage("O whatsapp deve ter entre 10 e 11 caracteres."),

    body("state").notEmpty().withMessage("Escolha um estado.").isUUID().withMessage("ID inválido."),
    body("city").notEmpty().withMessage("Escolha uma cidade.").isUUID().withMessage("ID inválido."),
];
