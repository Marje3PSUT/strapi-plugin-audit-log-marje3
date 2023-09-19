const yup = require("yup");

const stringArray = yup.array().of(yup.string());
const positiveIntArray = yup.array().of(yup.number().positive());

const includeExcludeMixed = (type) =>
  yup
    .object()
    .test(
      "xor",
      'Either "include" or "exclude" should exist in each config, but not both',
      (value) => {
        if (value.include && !value.exclude) {
          return type.isValidSync(value.include);
        }
        if (value.exclude && !value.include) {
          return type.isValidSync(value.exclude);
        }
        if (!value.exclude && !value.include) {
          return true;
        }

        return false;
      },
    );

module.exports = yup.object().shape({
  filters: yup
    .object()
    .shape({
      endpoint: includeExcludeMixed(stringArray).optional(),
      status: includeExcludeMixed(positiveIntArray).optional(),
      method: includeExcludeMixed(stringArray).optional(),
    })
    .optional(),
  redactedValues: stringArray.optional(),
});
