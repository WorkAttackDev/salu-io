// use zod to generate the following code:
import { z } from "zod";
import { validationErrorMessages } from ".";
import { slugify } from "../../../api/users/controllers/util";

const editUserValidator = z.object({
  id: z
    .number({
      invalid_type_error: validationErrorMessages.invalidType("id", "number"),
      required_error: validationErrorMessages.required("id"),
    })
    .optional(),
  name: z
    .string({
      required_error: validationErrorMessages.required("nome"),
      invalid_type_error: validationErrorMessages.invalidType("nome", "string"),
    })
    .max(200, validationErrorMessages.max("nome", 200))
    .min(1, validationErrorMessages.min("nome", 1)),
  userName: z
    .string({
      required_error: validationErrorMessages.required("nome de usuário"),
      invalid_type_error: validationErrorMessages.invalidType(
        "nome de usuário",
        "string"
      ),
    })
    .max(200, validationErrorMessages.max("nome de usuário", 200))
    .min(1, validationErrorMessages.min("nome de usuário", 1))
    .transform(slugify),
});

export type EditUserValidationParams = z.infer<typeof editUserValidator>;

export const editUserValidate = (param: EditUserValidationParams) => {
  return editUserValidator.parse(param);
};
