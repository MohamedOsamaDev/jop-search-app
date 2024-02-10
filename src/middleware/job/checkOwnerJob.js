import { jobModel } from "../../../database/models/job.model.js";
import { AppError } from "../../utils/AppError.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const checkOwnerJob = AsyncHandler(async (req, res, next) => {
  /*
  read me 
  this middleware to check if the HR is the owner of the this job
  */
  // step 1 find job by id from params
  const job = await jobModel.findById(req.params.id);
  //step 2 handle error (if job not found)
  if (!job) return next(new AppError("job  not found", 409));
  // step 3 check if HR is the owner of this job
  if (job.addedBy.toString() !== res.locals.user._id.toString())
    return next(new AppError("your not the owner", 409));
  // if all things is ok  then return next
  return next();
});
