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

const deletionObject = yup.object().shape({
  enabled: yup.bool(),
  frequency: yup.string().oneOf(["logAge", "logCount"]),
  options: yup.object().when("frequency", {
    is: "logAge",
    then: () =>
      yup.object().shape({
        value: yup.number().min(1),
        interval: yup.string().oneOf(["day", "week", "month", "year"]),
      }),
    otherwise: () =>
      yup.object().shape({
        value: yup.number().min(1),
      }),
  }),
});

module.exports = yup.object().shape({
  deletion: deletionObject.optional(),
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
