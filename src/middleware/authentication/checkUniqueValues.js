import { UserModel } from "../../../database/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { isThisFeildsExist } from "../../utils/isThisFeildsExist.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const checkUniqueValues = AsyncHandler(async (req, res, next) => {
  const { email, mobileNumber } = req.body;

  if (!email && !mobileNumber) return next();

  const user = await isThisFeildsExist({
    model: UserModel,
    feilds: { email, mobileNumber },
    operator: "or",
  });

  let checker = user.filter(
    (val) => val._id.toString() !== res.locals.user._id.toString()
  );

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

  return next();
});
