import { companyModel } from "../../../database/models/company.model.js";
import { AppError } from "../../utils/AppError.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const checkOwnerCompany = AsyncHandler(async (req, res, next) => {
  /*
  read me ! 
  this middleware to check if the user is the owner of the this company
   */
  //step 1 find company
  const company = await companyModel.findById(req.params.company);
  if (!company) return next(new AppError("company  not found", 409));
  // step 2 compare company hr id with this hr id
  if (company.companyHR.toString() !== res.locals.user._id.toString())
    return next(new AppError("your not the owner", 409));
  res.locals.company = company;
  //if all things is ok   then return next
  return next();
});
