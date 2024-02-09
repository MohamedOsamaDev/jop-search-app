import Joi from "joi";

const CreateApplicationSchemaVal = Joi.object({
  jobId: Joi.string().hex().length(24).required(),
  userId: Joi.string().hex().length(24).required(),
  userTechSkills: Joi.array().items(Joi.string().required()).required(),
  userSoftSkills: Joi.array().items(Joi.string().required()).required(),
  userResume: Joi.object({
    fieldname: Joi.string(),
    originalname: Joi.string(),
    encoding: Joi.string(),
    mimetype: Joi.string().pattern(/pdf/),
    size: Joi.number().max(5242880),
    destination: Joi.string(),
    filename: Joi.string(),
    path: Joi.string(),
  }).required(),
});
const idSchemaVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export { CreateApplicationSchemaVal, idSchemaVal };
