import { z } from "zod";
import { validationErrorMessages } from "..";
import { LabelType } from "../../../models/MyLabel";

const addOrCreateLabelValidator = z.object({
  id: z
    .string({
      required_error: validationErrorMessages.required("id"),
      invalid_type_error: validationErrorMessages.invalidType("id", "string"),
    })
    .optional(),
  projectOrTaskId: z.string({
    required_error: validationErrorMessages.required("projectOrTaskId"),
    invalid_type_error: validationErrorMessages.invalidType(
      "projectOrTaskId",
      "string"
    ),
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
  type: z.enum(LabelType),
});

export type AddOrCreateLabelValidationParams = z.infer<
  typeof addOrCreateLabelValidator
>;

export const addOrCreateLabelValidate = (
  param: AddOrCreateLabelValidationParams
) => {
  return addOrCreateLabelValidator.parse(param);
};
