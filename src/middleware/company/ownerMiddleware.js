import { AsyncHandler } from "../global-middleware/AsyncHandler.js";

export const ownerMiddleware = (field) => {
  return AsyncHandler(async (req, res, next) => {
    req.body[field] = res.locals.user._id;
    return next();
  });
};
