export const isThisFeildsExist = async ({ model, feilds, operator }) => {
  let filterObj = { [Object.keys(feilds)[0]]: Object.values(feilds)[0] };

  if (operator === "and" || operator === "or") {
    filterObj = {
      ["$" + operator]: Object.keys(feilds).map((val, ind) => {
        return {
          [Object.keys(feilds)[ind] || ""]:
            Object.values(feilds)[ind]?.toLowerCase() || "",
        };
      }),
    };
  }
  const document = await model.find(filterObj);
  return document;
};
