import express from "express";
import { auth } from "../../middleware/authentication/auth.js";
import {
  createJob,
  getallJobs,
  getOneJob,
  updateJob,
  deleteJob,
  getJobsByCompanyName,
} from "./job.controller.js";
import { userRoles } from "../../assets/types/userRoles.js";
import { authorized } from "../../middleware/authorization/authorization.js";
import { ownerMiddleware } from "../../middleware/company/ownerMiddleware.js";
import { vaildation } from "../../middleware/global-middleware/vaildtaion.js";
import {
  CreateJobSchemaVal,
  searchSchemaval,
} from "./job.vaildation.js";
import { checkOwnerJob } from "../../middleware/job/checkOwnerJob.js";
import { handleCompanyOwner } from "../../middleware/company/handleCompanyOwner.js";
import { handleFindAllApplications } from "../../middleware/application/handleFindAllApplications.js";
import { getallApplications } from "../application/application.controller.js";

const jobRouter = express.Router({ mergeParams: true });
jobRouter.use(auth);
jobRouter.use(
  "/:jobId/applications",
  authorized(userRoles.company_HR),
  handleFindAllApplications,
  getallApplications
);
jobRouter
  .route("/")
  .post(
    authorized(userRoles.company_HR),
    vaildation(CreateJobSchemaVal),
    handleCompanyOwner,
    ownerMiddleware("addedBy"),
    createJob
  )
  .get(authorized(userRoles.company_HR, userRoles.user), getallJobs);
jobRouter.get(
  "/searchJobs",
  vaildation(searchSchemaval),
  authorized(userRoles.company_HR, userRoles.user),
  getJobsByCompanyName
);
jobRouter
  .route("/:id")
  .get(authorized(userRoles.company_HR, userRoles.user), getOneJob)
  .put(authorized(userRoles.company_HR), checkOwnerJob, updateJob)
  .delete(authorized(userRoles.company_HR), checkOwnerJob, deleteJob);
export { jobRouter };
