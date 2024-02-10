import { UserModel } from "../../../database/models/user.model.js";
import {
  FindAll,
  FindOne,
  deleteOne,
  updateOne,
  InsertOne,
} from "../handlers/crudHandler.js";
const Errormassage = " user";
const adduser = InsertOne({
  model: UserModel,
  Errormassage,
  noReturnValue: "user",
});
const getallusers = FindAll({ model: UserModel, Errormassage });
const getOneusers = FindOne({ model: UserModel, Errormassage });
const updateusers = updateOne({ model: UserModel, Errormassage });
const deleteusers = deleteOne({ model: UserModel, Errormassage });
export { adduser, getallusers, getOneusers, updateusers, deleteusers };
