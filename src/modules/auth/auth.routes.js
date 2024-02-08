import express from "express";
import {
  signUp,
  logIn,
  logout,
  verfiyEmail,
  unsubscribe,
  changepassword,
  updateUser,
  deleteUser,
  softdelete,
  FPsendEmail,
  tokenForgetPassword,
  ResetPassword,
  findMe,
  findUserAccount,
  recoveryUsers,
} from "./auth.controller.js";
import { vaildation } from "../../middleware/global-middleware/vaildtaion.js";
import {
  signupschemaVal,
  signinSchemaVal,
  updateVal,
  updatePasswordVal,
  ForgetPasswordVal,
  authResetPasswordVal,
} from "./auth.vailadtion.js";
import { isUserExist } from "../../middleware/authentication/isUserExist.js";

import { auth } from "./../../middleware/authentication/auth.js";
import { comparePassword } from "./../../middleware/authentication/comparePassword.js";
import { checkUniqueValues } from "../../middleware/authentication/checkUniqueValues.js";
import { authToken } from "./../../middleware/authentication/authToken.js";
import { PincodeCheck } from "./../../middleware/authentication/PincodeCheck.js";

const authRouter = express.Router();
// start registration routes
authRouter.post("/register", vaildation(signupschemaVal), isUserExist, signUp); //sign up

authRouter.post("/login", vaildation(signinSchemaVal), logIn); //log in

authRouter.post("/logout", auth, logout); // log out

authRouter.get("/verify/:token", verfiyEmail); // verfiy Email

authRouter.get("/unsubscribe/:token", unsubscribe); // unsubscribe => delete account

// end registration routes

authRouter.delete("/softdelete", auth, softdelete); // soft delete => account will be blocked (cant log in if  account blocked)
authRouter
  .route(`/me`)
  .get(auth, findMe)
  .put(vaildation(updateVal), auth, checkUniqueValues, updateUser) // update user
  .delete(auth, deleteUser); // delete my account
authRouter.put(
  `/me/resetPassword`,
  vaildation(updatePasswordVal),
  auth,
  comparePassword,
  changepassword
); // reset password
authRouter.route("/:id").get(auth, findUserAccount); // find user account
// start forget password routes
authRouter.post("/forgetPassword", vaildation(ForgetPasswordVal), FPsendEmail); // send email for reset password
authRouter.get("/forgetPassword/:token", authToken, tokenForgetPassword); // this optional endpoint  for front-end to loaders(react js || next js) to check token for handle layout
authRouter.patch(
  "/resetPassword",
  vaildation(authResetPasswordVal),
  authToken,
  PincodeCheck,
  ResetPassword
); // reset password if token vaild
authRouter.get("/recoveryemail/:email", recoveryUsers);
// //end forgot paswword routes
export { authRouter };
