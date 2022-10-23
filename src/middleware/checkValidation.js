import { validationResult } from "express-validator";
export default function checkValidation(req, res, next) {
  try {
    validationResult(req).throw();
    next();
  } catch (err) {
    console.log(err.mapped());
    res.sendStatus(400)
  }
}
