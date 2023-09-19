import * as yup from "yup";

const schema = yup.object().shape({
  enabled: yup.boolean(),
  frequency: yup.string().oneOf(["logAge", "logCount"]),
  logAge: yup.object().shape({
    value: yup.number().min(1),
    interval: yup.string().oneOf(["day", "week", "month", "year"]),
  }),
  logCount: yup.object().shape({
    value: yup.number().min(1),
  }),
});

export default schema;
