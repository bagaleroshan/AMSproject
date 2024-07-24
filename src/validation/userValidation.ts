import Joi from "joi";

export const userValidation = ({ isCreate }: { isCreate: boolean }) =>
  Joi.object()
    .keys({
      userName: Joi.string()
        .lowercase()
        .messages({
          "any.required": "userName is required.",
        })
        .when("", {
          is: () => {
            return isCreate === true;
          },
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      email: Joi.string()
        .custom((value, msg: any) => {
          if (value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return true;
          }
          return msg.message("Invalid Email!!");
        })
        .lowercase()
        .when("", {
          is: () => {
            return isCreate === true;
          },
          then: Joi.required(),
          otherwise: Joi.optional(),
        })
        .messages({
          "any.required": "email is required.",
          "string.base": "Input must be string",
        }),
      phoneNumber: Joi.string()
        .custom((value, msg: any) => {
          if (
            value.match(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
          ) {
            return true;
          } else {
            return msg.message("Invalid phoneNumber");
          }
        })
        .when("", {
          is: () => {
            return isCreate === true;
          },
          then: Joi.required(),
          otherwise: Joi.optional(),
        })
        .messages({
          "any.required": "phoneNumber is required.",
        }),

      role: Joi.string()
        .custom((value, msg: any) => {
          if (value.match(/^(admin|teacher)$/)) {
            return true;
          }
          return msg.message("Invalid Role");
        })
        .when("", {
          is: () => {
            return isCreate === true;
          },
          then: Joi.required(),
          otherwise: Joi.optional(),
        })
        .messages({
          "any.required": "role is required.",
        }),
    })
    .unknown(false);
