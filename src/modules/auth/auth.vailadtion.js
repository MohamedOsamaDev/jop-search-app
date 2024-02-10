import Joi from "joi";

const signupschemaVal = Joi.object({
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
});
const signinSchemaVal = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string()
    .pattern(/^[A-Z][a-z0-9#@]{8,30}$/)
    .required(),
});

const ForgetPasswordSMSVal = Joi.object({
  mobileNumber: Joi.string().required(),
});
const updateVal = Joi.object({
  userName: Joi.string().min(3).max(30),
  lastName: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  recoveryEmail: Joi.string().email(),
  password: Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,30}$/),
  rePassword: Joi.valid(Joi.ref("password")),
  DOB: Joi.date(),
  mobileNumber: Joi.string(),
});
const updatePasswordVal = Joi.object({
  newpassword: Joi.string()
    .pattern(/^[A-Z][a-z0-9#@]{8,30}$/)
    .required(),
  currentpassword: Joi.string()
    .pattern(/^[A-Z][a-z0-9#@]{8,30}$/)
    .required(),
});
const authResetPasswordVal = Joi.object({
  newPassword: Joi.string()
    .pattern(/^[A-Z][a-z0-9#@]{8,30}$/)
    .required(),
  rePassword: Joi.valid(Joi.ref("newPassword")).required(),
  OTB: Joi.string().required(),
});
export {
  signinSchemaVal,
  signupschemaVal,
  ForgetPasswordSMSVal,
  updateVal,
  updatePasswordVal,
  authResetPasswordVal,
};
