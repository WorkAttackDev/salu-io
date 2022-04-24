import { z } from "zod";
import { validationErrorMessages } from "..";

const editLabelValidator = z.object({
  id: z.string({
    required_error: validationErrorMessages.required("id"),
    invalid_type_error: validationErrorMessages.invalidType("id", "string"),
  }),
  name: z
    .string({
      required_error: validationErrorMessages.required("nome"),
      invalid_type_error: validationErrorMessages.invalidType("nome", "string"),
    })
    .max(25, validationErrorMessages.max("nome", 25))
    .min(1, validationErrorMessages.min("nome", 1)),
  color: z
    .string({
      required_error: validationErrorMessages.required("cor"),
      invalid_type_error: validationErrorMessages.invalidType("cor", "string"),
    })
    .max(7, validationErrorMessages.max("cor", 7))
    .min(7, validationErrorMessages.min("cor", 7)),
});

export type EditLabelValidationParams = z.infer<typeof editLabelValidator>;

export const editLabelValidate = (param: EditLabelValidationParams) => {
  return editLabelValidator.parse(param);
};
