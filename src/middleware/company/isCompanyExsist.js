import { companyModel } from "../../../database/models/company.model.js";
import { AppError } from "../../utils/AppError.js";
import { isThisFeildsExist } from "../../utils/isThisFeildsExist.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const isCompanyExsist = AsyncHandler(async (req, res, next) => {
  const { companyName, companyEmail } = req.body;

  if (!companyName && !companyEmail) return next();

  const Checkcompanys = await isThisFeildsExist({
    model: companyModel,
    feilds: { companyName, companyEmail },
    operator: "or",
  });
  const company = await companyModel.findById(req.params.company);

  let checker = Checkcompanys.filter(
    (val) => val._id.toString() !== company?._id?.toString()
  );

  if (!!checker.length) {
    let errormassge = checker.map((val, ind) => {
      return val.companyName === companyName
        ? "companyName"
        : val.companyEmail === companyEmail
        ? "companyEmail"
        : "";
    });
    errormassge =
      errormassge.toString().replace(/,/g, " and ") + " araedy exist";
    return next(new AppError(errormassge, 409));
  }

  return next();
});
