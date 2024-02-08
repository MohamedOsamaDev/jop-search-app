import express from "express";
import { auth } from "../../middleware/authentication/auth.js";
import { userRoles } from "../../assets/types/userRoles.js";
import { authorized } from "../../middleware/authorization/authorization.js";
import { fileUploadSingle } from "../../services/FileUpload/FileUpload.js";
import { presavePdf } from "../../middleware/application/presave.js";
import { vaildation } from "../../middleware/global-middleware/vaildtaion.js";
import { CreateApplicationSchemaVal } from "./application.vaildation.js";
import {
  createApplication,
  getallApplications,
  getOneApplication,
  updateApplication,
  deleteApplication,
} from "./application.controller.js";
import { handleFindAllApplications } from "../../middleware/application/handleFindAllApplications.js";

const applicationRouter = express.Router({ mergeParams: true });
applicationRouter.use(auth);
applicationRouter
  .route("/")
  .post(
    fileUploadSingle("userResume"),
    authorized(userRoles.user),
    vaildation(CreateApplicationSchemaVal),
    presavePdf,
    createApplication
  );
export { applicationRouter };
