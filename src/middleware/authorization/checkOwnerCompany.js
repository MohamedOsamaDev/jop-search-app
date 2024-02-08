import { companyModel } from "../../../database/models/company.model.js";
import { AppError } from "../../utils/AppError.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const checkOwnerCompany = AsyncHandler(async (req, res, next) => {
  const company = await companyModel.findById(req.params.id);
  if (!company) return next(new AppError("company  not found", 409));
  if (company.companyHR.toString() !== res.locals.user._id.toString())
    return next(new AppError("your not the owner", 409));
    console.log('hanaaa');
  return next();
});
