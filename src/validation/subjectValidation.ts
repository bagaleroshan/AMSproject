import Joi from "joi";

export const subjectValidation = ({ isCreate }: { isCreate: boolean }) =>
  Joi.object().keys({
    subjectName: Joi.string()
      .min(3)
      .max(100)
      .custom((value, msg: any) => {
        if (value.match(/^[a-zA-Z].*/)) {
          return true;
        }
        return msg.message("subjectName should begin with letter only");
      })
      .when("", {
        is: () => {
          return isCreate === true;
        },
        then: Joi.required(),
        otherwise: Joi.optional(),
      })
      .messages({
        "any.required": "fullName is required",
        "string.base": "Input must be string",
      }),

    subjectCode: Joi.string()
      .required()
      .min(3)
      .max(30)
      .when("", {
        is: () => {
          return isCreate === true;
        },
        then: Joi.required(),
        otherwise: Joi.optional(),
      })
      .messages({
        "any.required": "subjectCode is required",
        "string.base": "Input must be string",
      }),

    numberOfClasses: Joi.number()
      .required()
      .max(500)
      .when("", {
        is: () => {
          return isCreate === true;
        },
        then: Joi.required(),
        otherwise: Joi.optional(),
      })
      .messages({
        "any.required": "numberOfClasses is required",
        "string.base": "Input must be a number",
      }),
  });
