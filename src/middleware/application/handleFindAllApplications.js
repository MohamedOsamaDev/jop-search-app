import { AppError } from "../../utils/AppError.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";
import { jobModel } from "./../../../database/models/job.model.js";

export const handleFindAllApplications = AsyncHandler(
  async (req, res, next) => {
    /*
    read me !
    this middleware to prevent the company_hr(user) from access to job informations  Which he doesn't owns
    */
    //step 1 extract the job id from request
    const { jobId } = req.params; // job id
    // step 2  extract the user id prev middleware => auth
    const userID = res.locals.user._id; // user id
    // step 3 find job details to check if job exists and this job related to his company
    const job = await jobModel.findById(jobId);
    if (!job) return next(new AppError("job  not found", 409));
    if (job.addedBy.toString() !== userID.toString())
      return next(
        new AppError(
          "your not have permission to access this job informations",
          409
        )
      );
    // if all things are ok then return next
    return next();
  }
);
