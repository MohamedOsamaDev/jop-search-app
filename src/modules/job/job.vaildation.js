import Joi from "joi";
import {
  jobLocations,
  seniorityLevels,
  workingTimes,
} from "../../assets/types/jobEnums.js";

const CreateJobSchemaVal = Joi.object({
  jobTitle: Joi.string().min(3).max(100).required(),
  jobDescription: Joi.string().min(3).max(500).required(),
  jobLocation: Joi.any()
    .valid(...Object.values(jobLocations))
    .required(),
  workingTime: Joi.any()
    .valid(...Object.values(workingTimes))
    .required(),
  seniorityLevel: Joi.any()
    .valid(...Object.values(seniorityLevels))
    .required(),
  technicalSkills: Joi.array().items(Joi.string()).required(),
  softSkills: Joi.array().items(Joi.string()).required(),
});
const UpdatejobSchemaVal = Joi.object({
  jobTitle: Joi.string().min(3).max(100),
  jobDescription: Joi.string().min(3).max(500),
  jobLocation: Joi.any().valid(...Object.values(jobLocations)),
  workingTime: Joi.any().valid(...Object.values(workingTimes)),
  seniorityLevel: Joi.any().valid(...Object.values(seniorityLevels)),
  technicalSkills: Joi.array().items(Joi.string()),
  softSkills: Joi.array().items(Joi.string()),
});
const idSchemaVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
const searchSchemaval = Joi.object({
  company: Joi.string().length(30).required(),
});
export { CreateJobSchemaVal, UpdatejobSchemaVal, idSchemaVal,searchSchemaval };
