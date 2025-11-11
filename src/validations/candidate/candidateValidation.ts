import { body } from "express-validator"
import { DegreeLevel } from "../../generated/prisma";

export const updateCandidateValidation = [
    body("birthdate").notEmpty().withMessage("Data de nascimento é obrigatória.").isISO8601().withMessage("Digite uma data válida no formato YYYY-MM-DD."),
    body("summary").trim().optional(),
    
    body("phone").exists().withMessage("O telefone é obrigatório").notEmpty().withMessage("O telefone é obrigatório.")
    .matches(/^\d*$/).withMessage("O telefone deve conter apenas números.")
    .isLength({min: 10, max: 11}).withMessage("O telefone deve ter entre 10 e 11 caracteres."),

    body("whatsapp").exists().withMessage("O whatsapp é obrigatório").notEmpty().withMessage("O whatsapp é obrigatório.")
    .matches(/^\d*$/).withMessage("O whatsapp deve conter apenas números.")
    .isLength({min: 10, max: 11}).withMessage("O whatsapp deve ter entre 10 e 11 caracteres."),

    body("state").notEmpty().withMessage("Escolha um estado.").isUUID().withMessage("ID inválido."),
    body("city").notEmpty().withMessage("Escolha uma cidade.").isUUID().withMessage("ID inválido."),
];


export const createCandidateEducationValidation = [
    body('institution').notEmpty().withMessage("A instituição é obrigatória."),
    body("degree").notEmpty().withMessage("O grau de instrução é obrigatório.").custom(( value )=>{
        const allowed = Object.values(DegreeLevel);
        return allowed.includes(value);
    }).withMessage("Grau de instrução inválido."),
    body("fieldOfStudy").notEmpty().withMessage("A área de estudo é obrigatória."),
    body("startDate")
        .optional()
        .isISO8601().withMessage("Data inválida."),

    body("endDate")
        .optional()
        .isISO8601().withMessage("Data inválida.")
        .custom((value, { req }) => {
            if (req.body.startDate && new Date(value) < new Date(req.body.startDate)) {
                throw new Error("A data final não pode ser antes da inicial.");
            }
            return true;
        }),

    body("currentlyStudying")
        .default(false)
        .toBoolean()
        .isBoolean().withMessage("Escolha uma opção válida."),
];

export const createCandidateCourseValidation = [
    body('title').notEmpty().withMessage('O nome do curso é obrigatório.'),
    body('institution').notEmpty().withMessage("A instituição é obrigatória."),
    body('hours').toInt().isInt().notEmpty().withMessage("A carga horária deve ser um inteiro."),
    body("completionDate").notEmpty().withMessage("Data de conclusão é obrigatória.").isISO8601().withMessage("Digite uma data válida no formato YYYY-MM-DD.")
];

export const createCandidateExperienceValidation = [
    body("company").notEmpty().withMessage("O nome da empresa é obrigatório."),
    body("position").notEmpty().withMessage("O cargo ocupado é obrigatório."),
    body("description").trim().optional(),
    body("startDate").notEmpty().withMessage('A data de início é obrigatória').isISO8601().withMessage("Digite uma data válida no formato YYYY-MM-DD."),
    body("endDate").optional().isISO8601().withMessage("Digite uma data válida no formato YYYY-MM-DD."),
    body("currentlyWorking")
    .default(false)
    .toBoolean()
    .isBoolean().withMessage("Escolha uma opção válida."),
];