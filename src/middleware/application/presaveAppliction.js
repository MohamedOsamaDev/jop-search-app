import { jobModel } from "../../../database/models/job.model.js";
import { Uploader } from "../../cloudnairy/cloudnairy.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const presaveAppliction = AsyncHandler(async (req, res, next) => {
  // step 1 extract job id from request body
  const { jobId } = req.body; // job id
  // step 2 find job by job id and check if it exists and extract company id
  let job = await jobModel.findById(jobId);
  if (!job) return res.json({ message: "can not find this job " });
  // step 3 handle file upload by custom function ;)
  req.body.userResume = await Uploader(req.files.userResume.path);
  // step 4 this line to handle create excel sheet by  set forgien key in application model
  req.body.company = job.company._id;
  // step 5 set user id in application before save
  req.body.userId = res.locals.user._id;
  // step 6 next to save in database
  next();
});
