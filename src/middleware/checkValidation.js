import { validationResult } from "express-validator";
export default function checkValidation(req, res, next) {
  try {
    validationResult(req).throw();
    next();
  } catch (err) {
    res.sendStatus(400)
  }
}
