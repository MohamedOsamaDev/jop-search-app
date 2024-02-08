import { UserModel } from "../../../database/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { isThisFeildsExist } from "../../utils/isThisFeildsExist.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const isUserExist = AsyncHandler(async (req, res, next) => {
  const user = await isThisFeildsExist({
    model: UserModel,
    feilds: { email: req.body.email, mobileNumber: req.body.mobileNumber },
    operator: "or",
  });

  if (!!user.length) return next(new AppError("user already exists. ", 409));
  next();
});
/* please read me !
function isThisFeildsEx  is custom function to check if user is already present in the database 
*/
