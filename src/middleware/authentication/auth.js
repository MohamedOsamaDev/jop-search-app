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
    // step 2 handle unexpected error like expired token | token is invalid
    if (err) return next(new AppError(err, 401));
    // step 3 find user
    const user = await UserModel.findById(decoded?.user);
    // step 4 Instead of putting or more if statement and this is reduces performance
    // create array of object and but all conditions and use just one if statement
    const arrayOfConditions = [
      {
        condition: !user,
        massege: "user not found",
      },
      {
        condition:
          user?.passwordChangedAt &&
          decoded.iat * 1000 < new Date(user.passwordChangedAt).getTime(),
        massege: "token is invaild",
      },
      {
        condition: user?.isblocked,
        massege: "user is blocked",
      },
    ];
    arrayOfConditions.map((val) => {
      if (val.condition) return next(new AppError(val.massege, 401));
    });
    // step 5 set user in variable
    res.locals.user = user;
    // if all conditions are true will go to next step :)
    return next();
  });
});
/*
anthor scenario make same conditions but with more if statement 
*/
/*
  jwt.verify(req.headers.token, process.env.SECRETKEY, async (err, decoded) => {
    if (err) return next(new AppError(err, 401));

    const user = await UserModel.findById(decoded?.user);

    if (!user) return next(new AppError("user not found", 401));
    if (user.passwordChangedAt && decoded.iat * 1000 < new Date(user.passwordChangedAt).getTime())
      return next(new AppError("token is invaild", 401));

    if (user?.isblocked) return next(new AppError("user is blocked", 401));
    res.locals.user = user;
    return next();
  });

*/
