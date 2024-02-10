import { AppError } from "../../utils/AppError.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";
import bcrypt from "bcrypt";

export const OTPChecker = AsyncHandler(async (req, res, next) => {
  /*
  read me 
  this middleware for compare  OTP  before change password and handle password not same as current password
  */
  // for handle check OTP code
  if (res.locals.user.OTP !== req.body.OTP)
    return next(new AppError("OTP is incorrect", 401));
  // for handle the new password is not the same as the current password
  if (bcrypt.compareSync(req.body.newPassword, res.locals.user.password))
    return next(
      new AppError(
        "he password cannot be changed because it is the same as the current password",
        409
      )
    );
  next();
});
