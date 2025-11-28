import { body } from 'express-validator';

export const companyProfileValidation = [
  // name
  body('name')
    .trim()
    .notEmpty().withMessage('Campo obrigatório.')
    .isLength({ max: 100 }).withMessage('Limite de 100 caracteres.'),

  // cnpj
  body('cnpj')
    .matches(/^\d{14}$/).withMessage('O CNPJ deve ter exatamente 14 dígitos.'),

  // website
  body('website')
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (value && value.trim() !== '') {
        const trimmedValue = value.trim();
        const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}$/i;
        if (!urlRegex.test(trimmedValue)) {
          throw new Error('Informe um endereço válido (ex: https://www.site.com)');
        }
      }
      return true;
    }),

  // description
  body('description')
    .trim()
    .notEmpty().withMessage('Campo obrigatório.')
    .isLength({ max: 500 }).withMessage('Limite de 500 caracteres.'),

  // isActive
  body('isActive')
    .isBoolean().withMessage('Deve ser um valor booleano.'),

  // phone - assumindo que phoneValidation é um array de validações
  body("phone").exists().withMessage("O telefone é obrigatório").notEmpty().withMessage("O telefone é obrigatório.")
    .matches(/^\d*$/).withMessage("O telefone deve conter apenas números.")
    .isLength({min: 10, max: 11}).withMessage("O telefone deve ter entre 10 e 11 caracteres."),

  // contactEmail
  body('contactEmail')
    .isEmail().withMessage('Digite um e-mail válido.')
    .normalizeEmail(),

  // instagram
  body('instagram')
    .optional({ checkFalsy: true })
    .trim()
    .isURL().withMessage('Insira um link válido.')
    .custom((value) => {
      if (value && !/^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._]+\/?$/.test(value)) {
        throw new Error('Informe um link válido do Instagram.');
      }
      return true;
    }),

  // facebook
  body('facebook')
    .optional({ checkFalsy: true })
    .trim()
    .isURL().withMessage('Insira um link válido.')
    .custom((value) => {
      if (value && !/^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9._-]+\/?$/.test(value)) {
        throw new Error('Informe um link válido do Facebook.');
      }
      return true;
    }),

  // linkedin
  body('linkedin')
    .optional({ checkFalsy: true })
    .trim()
    .isURL().withMessage('Insira um link válido.')
    .custom((value) => {
      if (value && !/^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9._-]+\/?$/.test(value)) {
        throw new Error('Informe um link válido do LinkedIn.');
      }
      return true;
    }),

  // stateId
  body('stateId')
    .isArray({ min: 1, max: 1 }).withMessage('Selecione um estado válido')
    .custom((value) => {
      if (!Array.isArray(value) || value.length !== 1) {
        throw new Error('Selecione um estado válido');
      }
      
      // Validar UUID - express-validator não tem validação nativa para UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value[0])) {
        throw new Error('Id inválido.');
      }
      return true;
    }),

  // cityId
  body('cityId')
    .isArray({ min: 1, max: 1 }).withMessage('Selecione uma cidade válida')
    .custom((value) => {
      if (!Array.isArray(value) || value.length !== 1) {
        throw new Error('Selecione uma cidade válida');
      }
      
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value[0])) {
        throw new Error('Id inválido.');
      }
      return true;
    }),

  // interestAreas
  body('companyInterest')
    .isArray({ min: 1 }).withMessage('O campo é obrigatório.')
    .custom((value) => {
      if (!Array.isArray(value) || value.length === 0) {
        throw new Error('O campo é obrigatório.');
      }
      
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      for (const item of value) {
        if (!uuidRegex.test(item)) {
          throw new Error('Id inválido.');
        }
      }
      return true;
    })
];