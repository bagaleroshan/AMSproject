import Joi from "joi";

export const studentValidation = Joi.object()
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
      .lowercase(),
    phoneNumber: Joi.string().required(),
  })
  .unknown(false);
