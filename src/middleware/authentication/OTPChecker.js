import { AppError } from "../../utils/AppError.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const OTPChecker = AsyncHandler(async (req, res, next) => {
  /*
  read me 
  this middleware for compare  OTP  before change password
  */
  if (res.locals.user.OTP !== req.body.OTP)
    return next(new AppError("OTP is incorrect", 401));
  next();
});
