import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Types.ObjectId, ref: "job", required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    company: { type: mongoose.Types.ObjectId, ref: "company", required: true },
    userTechSkills: [],
    userSoftSkills: [],
    userResume: { url: String, public_id: String },
  },
  { timestamps: true }
);
schema.pre(/^find/, function () {
  this.populate(
    "userId",
    'firstName lastName userName email mobileNumber',
  )
  this.populate("jobId");
});
export const applicationModel = mongoose.model("application", schema);
