import express from "express";
import { auth } from "../../middleware/authentication/auth.js";
import { userRoles } from "../../assets/types/userRoles.js";
import { authorized } from "./../../middleware/authorization/authorization.js";
import {
  createCompany,
  getallCompany,
  getOnecompany,
  updateCompany,
  deleteCompany,
} from "./company.controller.js";
import { vaildation } from "../../middleware/global-middleware/vaildtaion.js";
import {
  CreateCompanySchemaVal,
  UpdateCompanySchemaVal,
  idSchemaVal,
} from "./company.vaildation.js";
import { ownerMiddleware } from "../../middleware/company/ownerMiddleware.js";
import { isCompanyExsist } from "../../middleware/company/isCompanyExsist.js";
import { checkOwnerCompany } from "../../middleware/company/checkOwnerCompany.js";
import { jobRouter } from "../job/job.routes.js";

const companyRouter = express.Router();
companyRouter.use(auth);
companyRouter.use(
  "/:company/jobs",
  authorized(userRoles.company_HR),
  checkOwnerCompany,
  jobRouter
);

companyRouter
  .route("/")
  .post(
    vaildation(CreateCompanySchemaVal),
    authorized(userRoles.company_HR),
    isCompanyExsist,
    ownerMiddleware("companyHR"),
    createCompany
  )
  .get(getallCompany);
companyRouter
  .route("/:company")
  .get(getOnecompany)
  .put(
    vaildation(UpdateCompanySchemaVal),
    authorized(userRoles.company_HR),
    checkOwnerCompany,
    isCompanyExsist,
    updateCompany
  )
  .delete(
    authorized(userRoles.company_HR),
    vaildation(idSchemaVal),
    checkOwnerCompany,
    deleteCompany
  );
export { companyRouter };
