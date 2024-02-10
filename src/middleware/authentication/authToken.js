import { UserModel } from "../../../database/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";
import jwt from "jsonwebtoken";
export const authToken = AsyncHandler(async (req, res, next) => {
  /*
  read me
      this middleware to handle token in scenarios  forgetPassword and  resetPassword routes
      and check if token is valid 
  */
  // step 1 extract token from  request
  jwt.verify(req.headers.token, process.env.SECRETKEY, async (err, decoded) => {
    if (err) return next(new AppError(err, 401));
    // step 2  check if token is valid
    const user = await UserModel.findOne({ email: decoded.email });

    if (!user) return next(new AppError(`user not found`, 401));

    if (user?.isblocked) return next(new AppError("user is blocked", 401));

    if (!user.isresetPassword) return next(new AppError("session closed", 401));
    if (
      user.passwordChangedAt &&
      decoded.iat * 1000 < new Date(user.passwordChangedAt).getTime()
    ) {
      return next(new AppError("token is invaild", 401));
    }
    res.locals.user = user;
    // if all things is ok return next
    return next();
  });
});
