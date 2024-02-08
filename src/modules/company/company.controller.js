import { companyModel } from "../../../database/models/company.model.js";
import {
  FindAll,
  FindOne,
  deleteOne,
  updateOne,
  InsertOne,
} from "../handlers/crudHandler.js";
const Errormassage = "company";
let model = companyModel;
const createCompany = InsertOne({ model, Errormassage });
const getallCompany = FindAll({ model, Errormassage });
const getOnecompany = FindOne({ model, Errormassage });
const updateCompany = updateOne({ model, Errormassage });
const deleteCompany = deleteOne({ model, Errormassage });
export {
  createCompany,
  getallCompany,
  getOnecompany,
  updateCompany,
  deleteCompany,
};
