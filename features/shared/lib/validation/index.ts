import { z, ZodError } from "zod";

//* UTILS
export const validationErrorMessages = {
  email: `campo e-mail inválido`,
  required: (fieldName: string) => `campo ${fieldName} é obrigatório`,
  invalidType: (fieldName: string, type: string) =>
    `campo ${fieldName} precisa ser do tipo ${type}`,
  max: (fieldName: string, max: number) =>
    `O campo ${fieldName} precisa ter até ${max} caracteres`,
  min: (fieldName: string, min: number) =>
    `O campo ${fieldName} precisa ter mais de ${min} caracteres`,
};

export type ValidationError = ZodError;

//* BROAS VALIDATION

//* AUTH VALIDATION
//* Auth login validation

const LoginValidate = z.object({
  email: z
    .string({
      required_error: validationErrorMessages.required("e-mail"),
      invalid_type_error: validationErrorMessages.invalidType(
        "e-mail",
        "string"
      ),
    })
    .email(validationErrorMessages.email)
    .max(200, validationErrorMessages.max("e-mail", 200))
    .min(5, validationErrorMessages.min("e-mail", 5)),
  password: z
    .string({
      required_error: validationErrorMessages.required("password"),
      invalid_type_error: validationErrorMessages.invalidType(
        "password",
        "string"
      ),
    })
    .max(250, validationErrorMessages.max("password", 250))
    .min(8, validationErrorMessages.min("password", 8)),
});

export type LoginValidationParams = z.infer<typeof LoginValidate>;

export const loginValidation = (param: LoginValidationParams) => {
  return LoginValidate.parse(param);
};

//* Auth login with google

const LoginWithGoogleValidate = z.object({
  sub: z
    .string({
      required_error: validationErrorMessages.required("sub id"),
      invalid_type_error: validationErrorMessages.invalidType(
        "sub id",
        "string"
      ),
    })
    .max(100, validationErrorMessages.max("sub id", 100))
    .min(10, validationErrorMessages.min("sub id", 10)),
  picture: z
    .string({
      required_error: validationErrorMessages.required("imagem"),
      invalid_type_error: validationErrorMessages.invalidType(
        "imagem",
        "string"
      ),
    })
    .max(300, validationErrorMessages.max("imagem", 300))
    .min(10, validationErrorMessages.min("imagem", 10)),
  name: z
    .string({
      required_error: validationErrorMessages.required("name"),
      invalid_type_error: validationErrorMessages.invalidType("name", "string"),
    })
    .max(100, validationErrorMessages.max("name", 100))
    .min(2, validationErrorMessages.min("name", 2)),
  email: z
    .string({
      required_error: validationErrorMessages.required("e-mail"),
      invalid_type_error: validationErrorMessages.invalidType(
        "e-mail",
        "string"
      ),
    })
    .email(validationErrorMessages.email)
    .max(200, validationErrorMessages.max("e-mail", 200))
    .min(5, validationErrorMessages.min("e-mail", 5)),
  email_verified: z.boolean({
    required_error: validationErrorMessages.required("e-mail verificado"),
    invalid_type_error: validationErrorMessages.invalidType(
      "e-mail verificado",
      "boolean"
    ),
  }),
});

export type LoginWithGoogleValidationParams = z.infer<
  typeof LoginWithGoogleValidate
>;

export const loginWithGoogleValidation = (
  param: LoginWithGoogleValidationParams
) => {
  return LoginWithGoogleValidate.parse(param);
};

//* Auth forget password validation
const forgetPasswordValidator = z.object({
  email: z
    .string({
      required_error: validationErrorMessages.required("e-mail"),
      invalid_type_error: validationErrorMessages.invalidType(
        "e-mail",
        "string"
      ),
    })
    .email(validationErrorMessages.email)
    .max(200, validationErrorMessages.max("e-mail", 200))
    .min(5, validationErrorMessages.min("e-mail", 5)),
});

export type ForgetPasswordParams = z.infer<typeof forgetPasswordValidator>;

export const forgetPasswordValidate = (param: ForgetPasswordParams) => {
  return forgetPasswordValidator.parse(param);
};

//* Auth reset password validation
const resetPasswordValidator = z.object({
  token: z
    .string({
      required_error: validationErrorMessages.required("token"),
      invalid_type_error: validationErrorMessages.invalidType(
        "token",
        "string"
      ),
    })
    .max(190, validationErrorMessages.max("token", 190))
    .min(5, validationErrorMessages.min("token", 5)),

  password: z
    .string({
      required_error: validationErrorMessages.required("password"),
      invalid_type_error: validationErrorMessages.invalidType(
        "password",
        "string"
      ),
    })
    .max(250, validationErrorMessages.max("password", 250))
    .min(8, validationErrorMessages.min("password", 8)),
});

export type ResetPasswordParams = z.infer<typeof resetPasswordValidator>;

export const resetPasswordValidate = (param: ResetPasswordParams) => {
  return resetPasswordValidator.parse(param);
};
