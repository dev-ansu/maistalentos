import { body } from "express-validator"

export const createUserValidation = [
    body('name').trim().escape().notEmpty().withMessage('O nome é obrigatório.').isLength({min: 2}).withMessage("O nome deve ter no mínimo dois caracteres."),
    body('email').isEmail().normalizeEmail().withMessage("O e-mail é obrigatório."),
    body('password').trim().notEmpty().withMessage('A senha é obrigatória.')
    .isLength({ min: 6}).withMessage('Míninmo 6 caracteres.')
    .matches(/[A-Za-z]/).withMessage("A senha deve conter pelo menos 1 letra.")
    .matches(/[^A-Za-z0-9]/).withMessage("A senha deve conter pelo menos 1 caractere especial.")
];

export const authUserValidation = [
    body('email').isEmail().normalizeEmail().withMessage("O e-mail é obrigatório."),
    body('password').trim().notEmpty().withMessage('A senha é obrigatória.')
]