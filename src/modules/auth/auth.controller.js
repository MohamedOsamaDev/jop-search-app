import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

import { AppError } from "../../utils/AppError.js";
import { forPasswordEmail } from "../../services/mails/forgetPassword/forgetPassword.Email.js";
import { confirmEmail } from "../../services/mails/confirmation/confirmation.email.js";
import { UserModel } from "../../../database/models/user.model.js";
import { AsyncHandler } from "../../middleware/global-middleware/AsyncHandler.js";

const signUp = AsyncHandler(async (req, res, next) => {
  confirmEmail(req.body.email);
  const user = new UserModel(req.body);
  await user.save();
  return res.json({
    state: "success",
    message: "we sent verfiy massage to your email please confirm your email",
  });
});
const logIn = AsyncHandler(async (req, res, next) => {
  const { identifier, password } = req.body;
  let user = await UserModel.findOne({
    $or: [{ email: identifier }, { mobileNumber: identifier }],
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    if (user?.isblocked) return res.json({ message: "user is blocked" });

    if (user?.confirmEmail) {
      await UserModel.findByIdAndUpdate(user._id, { status: true });

      let token = jwt.sign({ user: user._id }, process.env.SECRETKEY);

      return res.json({ message: "success", token });
    } else {
      confirmEmail(user.email);
      next(new AppError(`can not log in without verfiy email`, 401));
    }
  } else {
    return next(new AppError(`incorrect email or password`, 401));
  }
});
const logout = AsyncHandler(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(res.locals.user._id, { status: false });
  return res.json({ message: "success" });
});
const verfiyEmail = AsyncHandler(async (req, res, next) => {
  jwt.verify(req.params.token, process.env.SECRETKEY, async (err, decoded) => {
    if (err) return next(new AppError(err, 401));
    const user = await UserModel.findOneAndUpdate(
      { email: decoded.email },
      { confirmEmail: true }
    );
    if (!user) return next(new AppError(`user not found`, 401));
    if (user.confirmEmail)
      return next(new AppError(`email Already verified`, 401));
    return res.json({ message: "success" });
  });
});
const unsubscribe = AsyncHandler(async (req, res, next) => {
  jwt.verify(req.params.token, process.env.SECRETKEY, async (err, decoded) => {
    if (err) return next(new AppError(err, 401));
    const user = await UserModel.findOne({ email: decoded.email });
    if (!user) return next(new AppError(`user not found`, 401));
    if (user?.verfiyEmail)
      return next(new AppError(`email Already verified`, 401));
    await UserModel.findOneAndDelete({ email: decoded.email });
    return res.json({ message: " now your not subscribe" });
  });
});
const findMe = AsyncHandler(async (req, res, next) => {
  let user = res.locals.user;
  user = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    recoveryEmail: user.recoveryEmail,
    mobileNumber: user.mobileNumber,
    DOB: user.DOB,
  }; // Implement to santizer to protect user data (data like password,pincode,etc...).
  return res.json({ user });
});
const findUserAccount = AsyncHandler(async (req, res, next) => {
  let user = await UserModel.findById(req.params.id).select(
    "email , lastName , firstName , userName , mobileNumber"
  );
  if (!user) return next(new AppError("user not found", 409));
  return res.json({ user });
});
const changepassword = AsyncHandler(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(res.locals.user._id, {
    password: bcrypt.hashSync(req.body.newpassword, 8),
  });
  res.json({ message: "success" });
});
const updateUser = AsyncHandler(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(res.locals.user._id, req.body);
  return res.json({ message: "sucess" });
});
const deleteUser = AsyncHandler(async (req, res, next) => {
  await UserModel.findByIdAndDelete(res.locals.user._id);
  return res.json({ message: "sucess" });
});
const softdelete = AsyncHandler(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(res.locals.user._id, {
    isblocked: true,
    isActive: false,
  });
  return res.json({ message: "success" });
});
const FPsendEmail = AsyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const findUser = await UserModel.findOne({ email });
  if (!findUser) return next(new AppError(`user not found`, 401));
  if (findUser?.isblocked) return next(new AppError("user is blocked", 401));

  const pincode = Math.floor(100000 + Math.random() * 900000);
  forPasswordEmail(email, pincode);
  await UserModel.findByIdAndUpdate(findUser._id, {
    Pincode: pincode,
    isresetPassword: true,
  });
  return res.json({ message: `We sent email to ${email} ` });
});
const tokenForgetPassword = AsyncHandler(async (req, res, next) => {
  return res.json({ message: "vaild token" });
});
const ResetPassword = AsyncHandler(async (req, res, next) => {
  req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 8);
  await UserModel.findByIdAndUpdate(res.locals.user._id, {
    password: req.body.newPassword,
    isresetPassword: false,
  });
  return res.json({ message: " Password updated successfully" });
});
const recoveryUsers = AsyncHandler(async (req, res, next) => {
  let users = await UserModel.find({ recoveryEmail: req.params.email }).select("email");
  if (!users.length) return next(new AppError(`user not found`, 401));
  return res.json({ data: users });
});
export {
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
};