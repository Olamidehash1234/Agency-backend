import { body } from 'express-validator';

export const validateProposal = [
  body('clientName').trim().notEmpty().escape(),
  body('email').isEmail().normalizeEmail(),
  body('company').trim().escape(),
  body('projectType').trim().notEmpty().escape(),
  body('budget').optional().isNumeric(),
  body('timeline').trim().escape(),
  body('description').trim().notEmpty().escape(),
];

export const validateNewsletter = [
  body('email')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail()
    .trim(),
];