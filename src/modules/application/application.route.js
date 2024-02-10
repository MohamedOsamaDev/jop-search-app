import express from "express";
import { auth } from "../../middleware/authentication/auth.js";
import { userRoles } from "../../assets/types/userRoles.js";
import { authorized } from "../../middleware/authorization/authorization.js";
import { fileUploadSingle } from "../../services/FileUpload/FileUpload.js";
import { presaveAppliction } from "../../middleware/application/presaveAppliction.js";
import { vaildation } from "../../middleware/global-middleware/vaildtaion.js";
import { CreateApplicationSchemaVal } from "./application.vaildation.js";
import { createApplication, createExecl } from "./application.controller.js";
import { handleIsApplyedBefore } from "../../middleware/application/handleIsApplyedBefore.js";

const applicationRouter = express.Router({ mergeParams: true });
applicationRouter.use(auth);
applicationRouter
  .route("/")
  .post(
    fileUploadSingle("userResume"),
    authorized(userRoles.user),
    vaildation(CreateApplicationSchemaVal),
    handleIsApplyedBefore,
    presaveAppliction,
    createApplication
  );
//----- bonus  ;)
applicationRouter.get(
  "/excelSheet",
  authorized(userRoles.company_HR),
  createExecl
);
export { applicationRouter };
