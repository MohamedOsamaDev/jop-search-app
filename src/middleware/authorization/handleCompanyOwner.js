import { companyModel } from "../../../database/models/company.model.js";
import { AppError } from "../../utils/AppError.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const handleCompanyOwner = AsyncHandler(async (req, res, next) => {
  let company = await companyModel.findOne({ companyHR: res.locals.user._id });
  if (!company) return next(new AppError("Couldn't find your company", 409));
  req.body.company = company._id;
  return next();
});
