import { AppError } from "../../utils/AppError.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const handleDeleteMySelf = AsyncHandler(async (req, res, next) => {
  /*
  read me
  this middleware to handle admin if he wnat delete his account by wrong
  */
  if (req.params.id === res.locals.user._id.toString()) {
    return next(new AppError("you can't delete yourself !!"));
  }
  return next();
});
