import { body, param } from "express-validator";

export const createStateValidation = [
    body('name').trim().escape().notEmpty().withMessage("O nome do estado é obrigatório."),
    body("acronym").trim().escape().toUpperCase()
    .notEmpty().withMessage("A sigla do estado é obrigatória.").isLength({min: 2, max:2}).withMessage("A sigla deve ter 2 caracteres."),
]

export const deleteStateValidation = [
    param('id').isUUID().withMessage("ID inválido").notEmpty().withMessage("Estado obrigatório."),
]
export const updateStateValidation = [
    param('id').isUUID().withMessage("ID inválido").notEmpty().withMessage("Estado obrigatório."),
    body('name').trim().escape().notEmpty().withMessage("O nome do estado é obrigatório."),
    body("acronym").trim().escape().toUpperCase()
    .notEmpty().withMessage("A sigla do estado é obrigatória.").isLength({min: 2, max:2}).withMessage("A sigla deve ter 2 caracteres."),
]
export const listStateValidation = [
    param('search').optional().trim().isString().withMessage("search deve ser string")
    .isLength({ min: 1, max: 100 }).withMessage("search deve ter até 100 caracteres")
    .matches(/^[\p{L}\p{N}\s\-'.,()]+$/u).withMessage("caracteres inválidos no search"),
]