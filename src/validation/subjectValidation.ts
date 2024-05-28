import Joi from "joi";

export const subjectValidation = Joi.object().keys({
  subjectName: Joi.string()
    .min(3)
    .max(100)
    .custom((value, msg: any) => {
      if (value.match(/^[a-zA-Z].*/)) {
        return true;
      }
      return msg.message("subjectName should begin with letter only");
    })
    .messages({
      "any.required": "fullName is required",
      "string.base": "Input must be string",
    })
    .required(),
  subjectCode: Joi.string().required().min(3).max(30).messages({
    "any.required": "subjectCode is required",
    "string.base": "Input must be string",
  }),

  numberOfClasses: Joi.number().required().min(10).max(500).messages({
    "any.required": "numberOfClasses is required",
    "string.base": "Input must be a number",
  }),
});
