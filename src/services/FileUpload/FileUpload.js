import multer from "multer";
import { v4 as uuid } from "uuid";
import { AppError } from "../../utils/AppError.js";
export const Upload = () => {
  const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //   cb(null, "uploads/");
    // },
    // filename: (req, file, cb) => {
    //   cb(null, uuid() + "-" + file.originalname);
    // },
  });
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes("pdf")) {
      cb(null, true);
    } else {
      cb(new AppError("pdf only", 401), false);
    }
  };
  const upload = multer({
    storage,
    fileFilter,
    // limits: { fileSize: 100000 /* bytes */ },
  });
  return upload;
};
export const fileUploadSingle = (feildname) => Upload().single(feildname);
export const fileUploadArray = (array) => Upload().array(array);
export const fileUploadfields = (fields) => Upload().fields(fields);
