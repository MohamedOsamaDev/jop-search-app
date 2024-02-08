import { applicationModel } from "../../../database/models/application.model.js";
import { companyModel } from "../../../database/models/company.model.js";
import { AsyncHandler } from "../../middleware/global-middleware/AsyncHandler.js";
import { ApiFetcher } from "../../utils/Fetcher.js";
import {
  FindAll,
  FindOne,
  deleteOne,
  updateOne,
  InsertOne,
} from "../handlers/crudHandler.js";
const Errormassage = "appliction";
let model = applicationModel;
const createApplication = InsertOne({ model, Errormassage });
const getallApplications = FindAll({ model, Errormassage, param: "jobId" });
const getOneApplication = FindOne({ model, Errormassage });
const updateApplication = updateOne({ model, Errormassage });
const deleteApplication = deleteOne({ model, Errormassage });
export {
  createApplication,
  getallApplications,
  getOneApplication,
  updateApplication,
  deleteApplication,
};
