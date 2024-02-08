import { AppError } from "../../utils/AppError.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";
import { jobModel } from "./../../../database/models/job.model.js";

export const handleFindAllApplications = AsyncHandler(
  async (req, res, next) => {
    const { jobId } = req.params; // job id
    const userID = res.locals.user._id; // user id
    const job = await jobModel.findById(jobId);
    if (!job) return next(new AppError("job  not found", 409));
    if (job.addedBy.toString()!== userID.toString())  return next(new AppError("your not have permission to access this job informations", 409));
    return next();
  }
);
