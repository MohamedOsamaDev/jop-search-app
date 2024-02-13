import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { userRoles } from "../../src/assets/types/userRoles.js";

const schema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    recoveryEmail: { type: String, trim: true },
    password: { type: String, required: true },
    mobileNumber: { type: String, required: true, unique: true },
    DOB: { type: Date },
    status: { type: Boolean, default: false },
    OTP: { type: String },
    isresetPassword: { type: Boolean, default: false },
    passwordChangedAt: Date,
    role: {
      type: String,
      enum: Object.values(userRoles),
      default: userRoles.user,
    },
    confirmEmail: { type: Boolean, default: false },
    isblocked: { type: Boolean, default: false },
  },
  {
    virtuals: true,
  },
  { timestamps: true }
);

schema.pre("save", function () {
  if (this.password) this.password = bcrypt.hashSync(this.password, 8);
});
schema.virtual("userName").get(function () {
  return this.firstName + " " + this.lastName;
});
schema.pre("findOneAndUpdate", function () {
  if (this._update.password) {
    this.password = bcrypt.hashSync(this._update.password, 8);
  }
  this.select("-password -OTB");
});
schema.pre("findOneAndDelete", function () {
  this.select("-password -OTB");
});
schema.pre("find", function () {
  this.select("-password -OTB");
});
export const UserModel = mongoose.model("user", schema);
