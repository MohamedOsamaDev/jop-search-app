import express from "express";
import {
  adduser,
  getallusers,
  getOneusers,
  updateusers,
  deleteusers,
} from "./user.controller.js";
import { vaildation } from "../../middleware/global-middleware/vaildtaion.js";
import { auth } from "../../middleware/authentication/auth.js";
import { authorized } from "../../middleware/authorization/authorization.js";
import { userRoles } from "../../assets/types/userRoles.js";
import {
  signupUserSchemaVal,
  updateUserVal,
  idUserSchemaVal,
} from "./user.vaildation.js";
import { checkUniqueValues } from "../../middleware/authentication/checkUniqueValues.js";
import { handleSaveUserByAdmin } from "../../middleware/authorization/handleSaveUserByAdmin.js";
import { handleDeleteMySelf } from "../../middleware/authorization/handleDeleteMySelf.js";
const userRouter = express.Router();
userRouter.use(auth, authorized(userRoles.admin));
userRouter
  .route("/")
  .post(vaildation(signupUserSchemaVal), checkUniqueValues,handleSaveUserByAdmin ,adduser)
  .get(getallusers);
userRouter
  .route("/:id")
  .get(vaildation(idUserSchemaVal), getOneusers)
  .patch(vaildation(updateUserVal), checkUniqueValues, updateusers)
  .delete(vaildation(idUserSchemaVal),handleDeleteMySelf,deleteusers);
export { userRouter };
/*
    signupUserSchemaVal,
    updateUserVal,
    idUserSchemaVal,
*/
