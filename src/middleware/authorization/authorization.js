import { AppError } from "../../utils/AppError.js";

export const authorized = (...permissions) => {
  /*
  read me
  this middleware to handle unAuthorized requests 
  */
  return (req, res, next) => {
    if (permissions.includes(res.locals.user.role)) {
      return next();
    } else {
      return next(new AppError("You are not authorized", 401));
    }
  };
};
