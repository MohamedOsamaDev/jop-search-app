import { companyModel } from "../../../database/models/company.model.js";
import { AppError } from "../../utils/AppError.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const handleCompanyOwner = AsyncHandler(async (req, res, next) => {
  /*
  read me 
  this middleware to check company is exists 
  and set this company as owner
   */
  //step find company and checking company owner
  let company = await companyModel.findOne({ companyHR: res.locals.user._id });
  // step 2 handle if company doesn't exists or this hr company is not owner
  if (!company) return next(new AppError("Couldn't find your company", 409));
  // set this company as owner the job
  req.body.company = company._id;
  // if all things are ok then return next
  return next();
});
