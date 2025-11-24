import { body, param } from "express-validator"
import { DegreeLevel } from "../../generated/prisma";

export const updateCandidateValidation = [
    body("birthdate").notEmpty().withMessage("Data de nascimento é obrigatória.").isISO8601().withMessage("Digite uma data válida no formato YYYY-MM-DD."),
    body("summary").trim().optional().isLength({ max:250}).withMessage("Limite de 250 caracteres."),
    
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
    body('institution').notEmpty().withMessage("A instituição é obrigatória.").isLength({ max:50}).withMessage("Limite de 50 caracteres."),
    body("degree").notEmpty().withMessage("O grau de instrução é obrigatório.").custom(( value )=>{
        const allowed = Object.values(DegreeLevel);
        return allowed.includes(value);
    }).withMessage("Grau de instrução inválido."),
    body("fieldOfStudy").notEmpty().withMessage("A área de estudo é obrigatória.").isLength({ max:50}).withMessage("Limite de 50 caracteres."),
    body("startDate")
        .optional()
        .isISO8601().withMessage("Data inválida."),

    body("endDate")
        .optional()
        .custom((value, { req }) => {

            // Se estiver cursando, endDate deve ser ignorado
            if (req.body.currentlyStudying == true || req.body.currentlyStudying == "true" || req.body.currentlyStudying == "on") {
                return true;
            }

            // Se NÃO estiver cursando → endDate é obrigatório
            if (!value) {
                throw new Error("A data de término é obrigatória quando não estiver cursando.");
            }

            // Deve ser uma data válida
            if (isNaN(Date.parse(value))) {
                throw new Error("Data de término inválida.");
            }

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
    body('title').notEmpty().withMessage('O nome do curso é obrigatório.').isLength({ max:50}).withMessage("Limite de 50 caracteres."),
    body('institution').notEmpty().withMessage("A instituição é obrigatória.").isLength({ max:50}).withMessage("Limite de 50 caracteres."),
    body('hours').toInt().isInt().notEmpty().withMessage("A carga horária deve ser um inteiro."),
    body("completionDate").notEmpty().withMessage("Data de conclusão é obrigatória.").isISO8601().withMessage("Digite uma data válida no formato YYYY-MM-DD.")
];

export const createCandidateExperienceValidation = [
  body("company")
    .notEmpty()
    .withMessage("O nome da empresa é obrigatório.").isLength({ max:50}).withMessage("Limite de 50 caracteres."),

  body("position")
    .notEmpty()
    .withMessage("O cargo ocupado é obrigatório.").isLength({ max:50}).withMessage("Limite de 50 caracteres."),

  body("description")
    .trim()
    .optional().isLength({ max:250}).withMessage("Limite de 250 caracteres."),

  body("startDate")
    .notEmpty()
    .withMessage("A data de início é obrigatória.")
    .isISO8601()
    .withMessage("Digite uma data válida no formato YYYY-MM-DD."),

  body("endDate")
    .optional()
    .custom((value, { req }) => {
      const currentlyWorking = req.body.currentlyWorking;

      // Se NÃO estiver trabalhando, endDate é obrigatória
      if (!currentlyWorking && !value) {
        throw new Error("A data de término é obrigatória quando não está trabalhando atualmente.");
      }

      return true;
    })
    .custom((value, { req }) => {
      // Se houver endDate, precisa ser >= startDate
      if (value) {
        const start = new Date(req.body.startDate);
        const end = new Date(value);

        if (end < start) {
          throw new Error("A data de término deve ser depois da data de início.");
        }
      }
      return true;
    }),

  body("currentlyWorking")
    .default(false)
    .toBoolean()
    .isBoolean()
    .withMessage("Escolha uma opção válida."),
];


export const deleteCandidateEducationValidation = [
    param('id').isUUID().withMessage('Id inválido'),
]
export const deleteCandidateCourseValidation = [
    param('id').isUUID().withMessage('Id inválido'),
]