import Joi from "joi";

export const userValidation = Joi.object()
  .keys({
    fullName: Joi.string()
      .custom((value, msg: any) => {
        if (!/^[a-zA-Z ]+$/.test(value)) {
          return msg.message("Full name must contain only letters.");
        } else if (value.length < 3 || value.length > 30) {
          return msg.message(
            "fullName must be between 3 and 30 characters long."
          );
        } else {
          return true;
        }
      })
      .required()
      .lowercase()
      .messages({
        "any.required": "fullName is required.",
        "string.base": "Input must be string",
      }),
    email: Joi.string()
      .custom((value, msg: any) => {
        if (value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          return true;
        }
        return msg.message("Invalid Email!!");
      })
      .required()
      .lowercase()
      .messages({
        "any.required": "email is required.",
        "string.base": "Input must be string",
      }),
    phoneNumber: Joi.string()
      .custom((value, msg: any) => {
        if (value.match(/^(?:\+977[-\s]?)?(?:98\d{8}|97\d{8}|0[1-9]\d{8})$/)) {
          return true;
        } else {
          return msg.message("Invalid phoneNumber");
        }
      })
      .required()
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
      .required()
      .messages({
        "any.required": "role is required.",
      }),
  })
  .unknown(false);
