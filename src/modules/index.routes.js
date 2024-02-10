import { AppError } from "../utils/AppError.js";
import { dbConnection } from "../../database/dbConnection.js";
import { globalError } from "./../middleware/global-middleware/globalError.js";
import { authRouter } from "./auth/auth.routes.js";
import { companyRouter } from "./company/company.route.js";
import { jobRouter } from "./job/job.routes.js";
import { applicationRouter } from "./application/application.route.js";
import { userRouter } from "./user/user.routes.js";

export const bootstrap = (app, express) => {
  const mainroute = "/api/v1"; // main route
  app.use(express.json()); // middlewar  for buffer
  app.use("/uploads", express.static("uploads")); // middlewar for File upload
  // start  Endpoints ----------------------------------------- |
  app.use(`${mainroute}/users`, userRouter);
  app.use(`${mainroute}/auth`, authRouter);
  app.use(`${mainroute}/companyies`, companyRouter);
  app.use(`${mainroute}/jobs`, jobRouter);
  app.use(`${mainroute}/applications`, applicationRouter);
  // End  Endpoints ------------------------------------------- |
  dbConnection(); // database connection
  app.use("*", (req, res, next) => {
    // handle UnException routes
    return next(new AppError(`not found endPoint: ${req.originalUrl}`, 404));
  });
  app.use(globalError); // error center
};
