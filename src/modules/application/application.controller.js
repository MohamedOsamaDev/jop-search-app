import { applicationModel } from "../../../database/models/application.model.js";
import startOfDay from "date-fns/startOfDay";
import endOfDay from "date-fns/endOfDay";
import { AsyncHandler } from "../../middleware/global-middleware/AsyncHandler.js";
import exceljs from "exceljs";
import {
  FindAll,
  FindOne,
  deleteOne,
  updateOne,
  InsertOne,
} from "../handlers/crudHandler.js";
import { companyModel } from "../../../database/models/company.model.js";
import { AppError } from "../../utils/AppError.js";

const Errormassage = "appliction";
let model = applicationModel;
const createApplication = InsertOne({ model, Errormassage });
const getallApplications = FindAll({ model, Errormassage, param: "jobId" });
const getOneApplication = FindOne({ model, Errormassage });
const updateApplication = updateOne({ model, Errormassage });
const deleteApplication = deleteOne({ model, Errormassage });
// bonus
const createExecl = AsyncHandler(async (req, res, next) => {
  // handle specific date || to day 
  let date = req.query.date || Date.now();
  if (!!isNaN(new Date(date))) return next(new AppError("invaild date"));
  // step 1 handle find company by companyId from user id => from prev middleware (auth)
  let company = await companyModel.findOne({ companyHR: res.locals.user._id });
  // step 2 handle find company applications by companyId
  let applications = await applicationModel
    .find({
      company: company._id,
      createdAt: {
        $gte: startOfDay(date),
        $lte: endOfDay(date),
      },
    })
    .populate("company");

  if (applications && !applications.length)
    return next(new AppError("no applications in this date"));

  // step 3 start to create sheet excel ;)
  let Workbook = new exceljs.Workbook();
  const sheet = Workbook.addWorksheet("applications");
  // step 4 handle columns and width in excel
  sheet.columns = [
    { header: "company", key: "company", width: 30 },
    { header: "job", key: "job", width: 30 },
    { header: "userResume", key: "userResume", width: 50 },
    { header: "date", key: "date", width: 25 },
  ];
  // step 5 handle data in excel by loop
  applications.map((val, ind) => {
    sheet.addRow({
      company: val.company.companyName,
      job: val.jobId.jobTitle,
      userResume: val.userResume.url,
      date: val.createdAt,
    });
  });
  // step 6 handle and send headers to client
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  // and give name to file excel
  res.setHeader(
    "Content-Disposition",
    `attachment;filename=applications-${company.companyName || "document"}.xlsx`
  );
  // step 7 send excel to client
  Workbook.xlsx.writeBuffer().then((buffer) => {
    res.end(buffer);
  });
});
export {
  createApplication,
  getallApplications,
  getOneApplication,
  updateApplication,
  deleteApplication,
  createExecl,
};
