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
    return next(new AppError("can not apply appliction twice", 409));
  // this to handle create excel sheet
  let job = await jobModel.findById(jobId);
  if (!job) return res.json({ message: "can not find this job " });
  req.body.company = job.company._id;
  req.body.userId = req.locals.user._id;

  return next();
});
