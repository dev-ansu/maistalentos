import { body, param } from "express-validator";

export const createCityValidation = [
    body('name').trim().escape().notEmpty().withMessage("O nome da cidade é obrigatório."),
    body("stateId").notEmpty().withMessage("O estado é obrigatória."),
]

export const listCityByStateIdValidation = [
    param('stateId').exists().withMessage("O parâmetro stateId é obrigatório.")
    .bail()
    .isUUID().withMessage("ID inválida.")
];

export const updateCityValidation = [
    param('id').exists().withMessage("O parâmetro id é obrigatório.")
    .bail().isUUID().withMessage("ID inválido."),
    body("stateId").exists().withMessage("O id do estado é obrigatório.").bail().isUUID().withMessage('ID inválido.'),
    body("name").trim().notEmpty().withMessage('O nome da cidade é obrigatório.')
    .matches(/^[\p{L}\s.'-]+$/u).withMessage("Nome da cidade contém caracteres inválidos.")
]