import { applicationModel } from "../../../database/models/application.model.js";
import { AppError } from "../../utils/AppError.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";
import { jobModel } from "./../../../database/models/job.model.js";

export const handleIsApplyedBefore = AsyncHandler(async (req, res, next) => {
  const { jobId } = req.body; // job id
  const userId = res.locals.user._id; // user id
  const isExistbefore = await applicationModel.findOne({
    userId,
    jobId,
  });
  if (isExistbefore)
    return next(new AppError("can not apply appliction twince", 409));
  // this to handle create excel sheet
  let company = await jobModel.findById(jobId);
  req.body.company = company.company._id;
  return next();
});
