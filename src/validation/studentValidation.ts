import Joi, { CustomHelpers, LanguageMessages } from "joi";

// Define custom error messages
// const customMessages: LanguageMessages = {
//   //   fullName: {
//   base: "Full Name must contain only letters and be between 3 and 30 characters long.",
//   //   },
// };

export const studentValidation = Joi.object()
  .keys({
    fullName: Joi.string()
      .custom((value, msg: any) => {
        if (value.match(/^[a-zA-Z]{3,30}( [a-zA-Z]{3,30}){0,2}$/)) {
          return true;
        }
        return msg.message(
          "Full Name must contain only letters and be between 3 and 30 characters long."
        );
      })
      .required()
      .lowercase(),
    email: Joi.string()
      .custom((value, msg: any) => {
        if (value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          return true;
        }
        return msg.message("Invalid Email!!");
      })
      .required()
      .lowercase(),
    course: Joi.string().required().lowercase(),
    phoneNumber: Joi.string().required(),
  })
  .unknown(false);
