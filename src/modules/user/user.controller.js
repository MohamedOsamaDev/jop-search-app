import { UserModel } from "../../../database/models/user.model.js";
import {
  FindAll,
  FindOne,
  deleteOne,
  updateOne,
  InsertOne,
} from "../handlers/crudHandler.js";
const Errormassage = " user";
let model = UserModel;
const adduser = InsertOne({ model, Errormassage });
const getallusers = FindAll({ model, Errormassage });
const getOneusers = FindOne({ model, Errormassage });
const updateusers = updateOne({ model, Errormassage });
const deleteusers = deleteOne({ model, Errormassage });
export { adduser, getallusers, getOneusers, updateusers, deleteusers };
