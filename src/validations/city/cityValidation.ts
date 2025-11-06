import { body } from "express-validator";

export const createCityValidation = [
    body('name').trim().escape().notEmpty().withMessage("O nome da cidade é obrigatório."),
    body("stateId").notEmpty().withMessage("O estado é obrigatória."),
]