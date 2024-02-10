import { UserModel } from "../../../database/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { isThisFeildsExist } from "../../utils/isThisFeildsExist.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const checkUniqueValues = AsyncHandler(async (req, res, next) => {
  /*
  read me !
  this middleware to check if there are any unique values like mobileNumber or email match with any email or mobil number in data base 
  to handle conflict with existing 
  */
  //step 1 extract values from database
  const { email, mobileNumber } = req.body;
  // step 2  if mobil number Email  doesn't send in request return next
  // to Providing the number of requests on the database that are of no use
  if (!email && !mobileNumber) return next();
  // step 2 Make sure that no company has the same email or name that came from the request
  // by custom function
  const user = await isThisFeildsExist({
    model: UserModel,
    feilds: { email, mobileNumber },
    operator: "or",
  });

  // step 3 handle conflict and Filter out the suspicious group
  let checker = user.filter(
    (val) => val._id.toString() !== res.locals.user._id.toString()
  );
  // step 4 make function to handle error massege
  if (!!checker.length) {
    let errormassge = checker.map((val, ind) => {
      return val.email === email
        ? "email"
        : val.mobileNumber === mobileNumber
        ? "mobileNumber"
        : "";
    });
    errormassge =
      errormassge.toString().replace(/,/g, " and ") + " araedy exist";
    return next(new AppError(errormassge, 409));
  }
  // if all things are ok then return next
  return next();
});
