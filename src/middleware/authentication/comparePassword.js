import bcrypt from "bcrypt";
import { AppError } from "../../utils/AppError.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const comparePassword = AsyncHandler(async (req, res, next) => {
  /*
    read me 
    this middleware for compare  password before change password 
    */
  const { newpassword, currentpassword } = req.body;
  if (!bcrypt.compareSync(currentpassword, res?.locals?.user?.password))
    return next(new AppError("current password wrong !", 401));
  if (newpassword === currentpassword)
    next(
      new AppError(
        "The password cannot be changed because it is the same as the current password",
        401
      )
    );
  return next();
});
