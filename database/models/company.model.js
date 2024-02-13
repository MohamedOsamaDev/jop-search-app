import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema(
  {
    companyName: { type: String, trim: true, required: true, unique: true },
    description: { type: String, trim: true, required: true },
    industry: { type: String, trim: true, required: true },
    address: { type: String, required: true },
    numberOfEmployees: { type: Number, default: 0 },
    companyEmail: { type: String, trim: true, required: true, unique: true },
    companyHR: { type:  mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true }
);
export const companyModel = mongoose.model("company", schema);
