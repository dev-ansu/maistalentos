import { body, param } from "express-validator";

export const createStateValidation = [
    body('name').trim().escape().notEmpty().withMessage("O nome do estado é obrigatório."),
    body("acronym").trim().escape().toUpperCase()
    .notEmpty().withMessage("A sigla do estado é obrigatória.").isLength({min: 2, max:2}).withMessage("A sigla deve ter 2 caracteres."),
]

export const deleteStateValidation = [
    param('id').isUUID().withMessage("ID inválido").notEmpty().withMessage("Estado obrigatório."),
]