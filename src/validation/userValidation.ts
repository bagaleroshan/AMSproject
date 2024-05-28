import Joi from "joi";

export const userValidation = ({ isCreate }: { isCreate: boolean }) =>
  Joi.object()
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
        .when("", {
          is: () => {
            return isCreate === true;
          },
          then: Joi.required(),
          otherwise: Joi.optional(),
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
        }),
    })
    .unknown(false);
