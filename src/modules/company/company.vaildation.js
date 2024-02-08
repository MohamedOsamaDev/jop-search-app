import Joi from "joi";

const CreateCompanySchemaVal = Joi.object({
  companyName: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(500).required(),
  industry: Joi.string().min(3).max(200).required(),
  address: Joi.string().min(3).max(200).required(),
  numberOfEmployees: Joi.number().required(),
  companyEmail: Joi.string().email().required(),
}); 
const UpdateCompanySchemaVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  companyName: Joi.string().min(3).max(30),
  description: Joi.string().min(3).max(500),
  industry: Joi.string().min(3).max(200),
  address: Joi.string().min(3).max(200),
  numberOfEmployees: Joi.number(),
  companyEmail: Joi.string().email(),
  companyHR: Joi.string().hex().length(24),
});
const idSchemaVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export { CreateCompanySchemaVal, UpdateCompanySchemaVal, idSchemaVal };
