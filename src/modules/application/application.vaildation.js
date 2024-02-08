import Joi from "joi";

const CreateApplicationSchemaVal = Joi.object({
  jobId: Joi.string().hex().length(24).required(),
  userId: Joi.string().hex().length(24).required(),
  userTechSkills: Joi.array().items(Joi.string()),
  userSoftSkills: Joi.array().items(Joi.string()),
  userResume: Joi.object({
    fieldname: Joi.string(),
    originalname: Joi.string(),
    encoding: Joi.string(),
    mimetype: Joi.string(),
    size: Joi.number().max(5242880),
    destination: Joi.string(),
    filename: Joi.string(),
    path: Joi.string(),
  }).required(),
});
const UpdateApplicationSchemaVal = Joi.object({
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
export { CreateApplicationSchemaVal, UpdateApplicationSchemaVal, idSchemaVal };
