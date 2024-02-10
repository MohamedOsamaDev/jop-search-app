import { companyModel } from "../../../database/models/company.model.js";
import { AppError } from "../../utils/AppError.js";
import { isThisFeildsExist } from "../../utils/isThisFeildsExist.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const isCompanyExsist = AsyncHandler(async (req, res, next) => {
  /*
  read me !
  this middleware to check if the company already exist by search company Name and company email
  to handle conflict with existing 
  */
  //step 1 extract values from database
  const { companyName, companyEmail } = req.body;
  // step 2  if company Name and company Email  doesn't send in request return next
  // to Providing the number of requests on the database that are of no use
  if (!companyName && !companyEmail) return next();
  // step 2 Make sure that no company has the same email or name that came from the request
  // by custom function
  const checkCompanys = await isThisFeildsExist({
    model: companyModel,
    feilds: { companyName, companyEmail },
    operator: "or",
  });
  //step 3 find company by id from params to
  // handle conflict and Filter out the suspicious group
  const company = res.locals.company;
  // filter
  let checker = checkCompanys.filter(
    (val) => val._id.toString() !== company?._id?.toString()
  );
  // step 4 make function to handle error massege
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
  // if all things are ok then return next
  console.log(res.locals.company);
  return next();
});
