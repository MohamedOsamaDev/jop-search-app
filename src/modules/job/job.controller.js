import { companyModel } from "../../../database/models/company.model.js";
import { jobModel } from "../../../database/models/job.model.js";
import { AsyncHandler } from "../../middleware/global-middleware/AsyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { ApiFetcher } from "../../utils/Fetcher.js";
import {
  FindAll,
  FindOne,
  deleteOne,
  updateOne,
  InsertOne,
} from "../handlers/crudHandler.js";
const Errormassage = "job";
let model = jobModel;
const createJob = InsertOne({ model, Errormassage });
const getallJobs = FindAll({ model, Errormassage });
const getOneJob = FindOne({ model, Errormassage });
const updateJob = updateOne({ model, Errormassage });
const deleteJob = deleteOne({ model, Errormassage });
const getJobsByCompanyName = AsyncHandler(async (req, res, next) => {
  const query = req.query.company;
  let companyID = await companyModel.findOne({ companyName: query })


  if (!companyID) return next(new AppError("company not found"));

  let apiFetcher = new ApiFetcher(jobModel.find({ company: companyID._id }),req.query);

  apiFetcher.pagination();
  let total = new ApiFetcher(jobModel.find({ company: companyID._id }),req.query);

  total = await total.mongooseQuery.countDocuments();

  apiFetcher.pagination()

  let pages = Math.ceil(total / apiFetcher.metadata.pageLimit);

  let data = await apiFetcher.mongooseQuery;

  return res.json({
    metadata: {
      ...apiFetcher.metadata,
      pages,
      total,
    },
    data,
  });
});
export {
  createJob,
  getallJobs,
  getOneJob,
  updateJob,
  deleteJob,
  getJobsByCompanyName,
};
