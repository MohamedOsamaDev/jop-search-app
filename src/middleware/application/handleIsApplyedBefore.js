import { applicationModel } from "../../../database/models/application.model.js";
import { AppError } from "../../utils/AppError.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";
import { jobModel } from "./../../../database/models/job.model.js";

export const handleIsApplyedBefore = AsyncHandler(async (req, res, next) => {
  /*
read me please
this middleware to prevent the user from applied twice in same job
*/

  // step 1  extract  job id and user id
  const { jobId } = req.body; // job id
  const userId = res.locals.user._id; // user id
  // step 2 check if user applyed before on this job
  const isExistbefore = await applicationModel.findOne({
    userId,
    jobId,
  });
  if (isExistbefore)
    return next(new AppError("can not apply appliction twice", 409));

  // if user doesn't applyed before on this job  will return next
  return next();
});
