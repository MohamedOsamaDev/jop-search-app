import { jobModel } from "../../../database/models/job.model.js";
import { AppError } from "../../utils/AppError.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const checkOwnerJob = AsyncHandler(async (req, res, next) => {
  const job = await jobModel.findById(req.params.id);
  if (!job) return next(new AppError("job  not found", 409));
  if (job.addedBy.toString() !== res.locals.user._id.toString())
    return next(new AppError("your not the owner", 409));
  return next();
});
