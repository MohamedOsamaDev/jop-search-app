import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {
  jobLocations,
  seniorityLevels,
  workingTimes,
} from "../../src/assets/types/jobEnums.js";
import { userRoles } from "../../src/assets/types/userRoles.js";

const schema = new mongoose.Schema(
  {
    jobTitle: { type: String, trim: true, required: true },
    jobLocation: {
      type: String,
      enum: Object.values(jobLocations),
    },
    workingTime: {
      type: String,
      enum: Object.values(workingTimes),
    },
    seniorityLevel: {
      type: String,
      enum: Object.values(seniorityLevels),
    },
    jobDescription: { type: String, required: true },
    technicalSkills: [],
    softSkills: [],
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);
schema.pre(/^find/, function () {
  this.populate("company");
});
export const jobModel = mongoose.model("job", schema);
