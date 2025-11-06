import { body, param } from "express-validator";

export const createCityValidation = [
    body('name').trim().escape().notEmpty().withMessage("O nome da cidade é obrigatório."),
    body("stateId").notEmpty().withMessage("O estado é obrigatória."),
]

export const listCityByStateIdValidation = [
    param('stateId').exists().withMessage("O parâmetro stateId é obrigatório.")
    .bail()
    .isUUID().withMessage("ID inválida.")
]