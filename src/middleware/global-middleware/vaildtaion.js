import { AppError } from "../../utils/AppError.js";

export const vaildation = (schema) => {
  return (req, res, next) => {
    let files = {};
    if (req.files || req.file) {
      files = req.files ? req.files : { [req.file.fieldname]: req.file };
      req.files = files;
    }
    if (req.files && Object.values(req?.files).length === 0)
      req.files = undefined;
    const { error } = schema.validate(
      { ...files, ...req.body, ...req.params, ...req.query },
      { abortWarly: false }
    );
    if (!error) {
      next();
    } else {
      let errmsg = [];
      error.details.forEach((val) => {
        errmsg.push(val.message);
      });
      return next(new AppError(errmsg, 401));
    }
  };
};
