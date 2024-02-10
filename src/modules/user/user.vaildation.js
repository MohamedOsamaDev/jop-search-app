import Joi from "joi";
import { userRoles } from "../../assets/types/userRoles.js";

const signupUserSchemaVal = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  recoveryEmail: Joi.string().email(),
  password: Joi.string()
    .pattern(/^[A-Z][a-z0-9#@]{8,30}$/)
    .required(),
  rePassword: Joi.valid(Joi.ref("password")).required(),
  DOB: Joi.date().required(),
  mobileNumber: Joi.string().required(),
  role: Joi.any()
  .valid(...Object.values(userRoles))
});
const updateUserVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  role: Joi.any()
  .valid(...Object.values(userRoles)),
  isblocked: Joi.string().min(3).max(30),
});
const idUserSchemaVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export { signupUserSchemaVal, updateUserVal, idUserSchemaVal };
