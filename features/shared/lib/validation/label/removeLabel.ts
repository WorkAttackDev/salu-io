import { z } from "zod";
import { validationErrorMessages } from "..";

const removeLabelValidator = z.object({
  id: z.string({
    required_error: validationErrorMessages.required("id"),
    invalid_type_error: validationErrorMessages.invalidType("id", "string"),
  }),
  taskId: z.number({
    required_error: validationErrorMessages.required("projectOrTaskId"),
    invalid_type_error: validationErrorMessages.invalidType(
      "projectOrTaskId",
      "number"
    ),
  }),
});

export type RemoveLabelValidationParams = z.infer<typeof removeLabelValidator>;

export const removeLabelValidate = (param: RemoveLabelValidationParams) => {
  return removeLabelValidator.parse(param);
};
