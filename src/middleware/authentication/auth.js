import jwt from "jsonwebtoken";
import { AppError } from "../../utils/AppError.js";
import { UserModel } from "../../../database/models/user.model.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const auth = AsyncHandler(async (req, res, next) => {
  /*
  read me
  this middleware to handle authenticated requests
  */
  // step 1  verify token and check is user authenticated or not
  jwt.verify(req.headers.token, process.env.SECRETKEY, async (err, decoded) => {
    if (err) return next(new AppError(err, 401));

    const user = await UserModel.findById(decoded?.user);
    if (!user) return next(new AppError("user not found", 401));
    if (
      user.passwordChangedAt &&
      decoded.iat * 1000 < new Date(user.passwordChangedAt).getTime()
    )
      return next(new AppError("token is invaild", 401));

    if (user?.isblocked) return next(new AppError("user is blocked", 401));
    res.locals.user = user;
    return next();
  });
});
