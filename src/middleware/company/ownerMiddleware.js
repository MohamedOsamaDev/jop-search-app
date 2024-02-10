import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const ownerMiddleware = (field) => {
  return AsyncHandler(async (req, res, next) => {
    /*read me 
    this middleware to handle created by | added by
    */
    req.body[field] = res.locals.user._id;
    return next();
  });
};
