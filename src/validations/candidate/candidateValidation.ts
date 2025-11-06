import { body } from "express-validator"

export const updateCandidateValidation = [
    body("birthdate").isDate().withMessage("Digite uma data válida."),
    body("summary").trim().escape().optional(),
    
    body("phone").notEmpty().withMessage("O telefone é obrigatório.")
    .matches(/^\d*$/).withMessage("O número deve conter apenas números.")
    .isLength({min: 10, max: 11}).withMessage("O telefone deve ter entre 10 e 11 caracteres."),

    body("whatsapp").notEmpty().withMessage("O telefone é obrigatório.")
    .matches(/^\d*$/).withMessage("O whatsapp deve conter apenas números.")
    .isLength({min: 10, max: 11}).withMessage("O whatsapp deve ter entre 10 e 11 caracteres."),

    body("state").trim().escape().notEmpty().withMessage("Escolha um estado."),
    body("city").trim().escape().notEmpty().withMessage("Escolha uma cidade."),
];
