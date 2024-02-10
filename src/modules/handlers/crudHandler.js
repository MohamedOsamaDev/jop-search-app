import slugify from "slugify";
import { AsyncHandler } from "../../middleware/global-middleware/AsyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { ApiFetcher } from "../../utils/Fetcher.js";
import { UserModel } from "../../../database/models/user.model.js";

export const InsertOne = ({ model, Errormassage }) => {
  return AsyncHandler(async (req, res, next) => {
    const document = new model(req.body);
    await document.save();
    return res.json({
      data: document,
    });
  });
};
export const FindAll = ({ model, Errormassage, param }) => {
  return AsyncHandler(async (req, res, next) => {
    let filterObject = {};
    if (param && req.params[param]) {
      filterObject = { [param]: req.params[param] };
    }

    let apiFetcher = new ApiFetcher(model.find(filterObject), req.query);
    let total = new ApiFetcher(model.find(filterObject), req.query);
    total.filter().search();
    total = await total.mongooseQuery.countDocuments();
    apiFetcher.pagination().filter().search().sort().select();
    let pages = Math.ceil(total / apiFetcher.metadata.pageLimit);
    let data = await apiFetcher.mongooseQuery;
    return res.json({
      metadata: {
        ...apiFetcher.metadata,
        pages,
        total,
      },
      data,
    });
  });
};
export const FindOne = ({ model, Errormassage }) => {
  return AsyncHandler(async (req, res, next) => {
    const document = await model.findById(req.params.id);
    if (!document) return next(new AppError(Errormassage, 404));
    return res.json({
      data: document,
    });
  });
};
export const updateOne = ({ model, Errormassage, slug, param }) => {
  return AsyncHandler(async (req, res, next) => {
    let _id = req.params[param] || req.params.id;
    if (req.params[param] && req.params.id)
      return next(
        new AppError("can't find paramas to update this document", 404)
      );
    if (slug) {
      let checkObject = { [slug]: req.body[slug] };

      const checkDocument = await model.findOne(checkObject);

      if (checkDocument)
        return next(new AppError(`${slug} must be unique`, 401));

      req.body.slug = slugify(req.body[slug]);
    }

    const document = await model.findByIdAndUpdate({ _id }, req.body, {
      new: true,
    });
    if (!document) return next(new AppError(`${Errormassage} not found `, 404));

    return res.json({
      data: document,
    });
  });
};
export const deleteOne = ({ model, Errormassage, param }) => {
  return AsyncHandler(async (req, res, next) => {
    let id = req.params[param] || req.params.id;
    if (req.params[param] && req.params.id)
      return next(
        new AppError("can't find paramas to update this document", 404)
      );
    const document = await model.findByIdAndDelete(id);
    if (!document) return next(new AppError(Errormassage + " not found", 404));
    return res.json({
      data: document,
    });
  });
};
