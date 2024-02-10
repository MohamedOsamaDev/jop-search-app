import { UserModel } from "../../../database/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const isUserBlocked = (identifier) => {
  return AsyncHandler(async (req, res, next) => {
    /*
    read me 
    this middleware for check user before sending sms or email
    */
    let query = {
      [identifier]: req.body[identifier],
    };
    const findUser = await UserModel.findOne(query);
    if (!findUser) return next(new AppError(`user not found`, 401));
    if (findUser?.isblocked) return next(new AppError("user is blocked", 401));
    res.locals.user = findUser
    return next();
  });
};
