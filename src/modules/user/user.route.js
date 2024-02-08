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
import {} from "./user.vaildation.js";
import { userRoles } from "../../assets/types/userRoles.js";

const userRouter = express.Router();
userRouter.use(auth, authorized(userRoles.admin));



userRouter.route("/").post(vaildation(), adduser).get(getallusers);
userRouter
  .route("/:id")
  .get(getOneusers)
  .put(vaildation(), updateusers)
  .delete(vaildation(), deleteusers);
export { userRouter };
