import { AppError } from "../../utils/AppError.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const OTBChecker = AsyncHandler(async (req, res, next) => {
  /*
  read me 
  this middleware for compare  OTB  before change password
  */
  if (res.locals.user.OTB !== req.body.OTB)
    return next(new AppError("OTB is incorrect", 401));
  next();
});
