import jwt from "jsonwebtoken";
import { AppError } from "../../utils/AppError.js";
import { UserModel } from "../../../database/models/user.model.js";
import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const handleSaveUserByAdmin = AsyncHandler(async (req, res, next) => {
  /*
  read me
  this middleware to handle confirmEmail when admin create account admin or HR
  */
  req.body.confirmEmail = true;
  return next();
});
