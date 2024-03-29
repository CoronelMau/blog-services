import { validationResult } from 'express-validator';

export default function validateFields(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json(errors);

  next();
}
