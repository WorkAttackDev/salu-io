import { z } from "zod";
import { validationErrorMessages } from "..";

const deleteLabelValidator = z.object({
  id: z.string({
    required_error: validationErrorMessages.required("id"),
    invalid_type_error: validationErrorMessages.invalidType("id", "string"),
  }),
});

export type DeleteLabelValidationParams = z.infer<typeof deleteLabelValidator>;

export const deleteLabelValidate = (param: DeleteLabelValidationParams) => {
  return deleteLabelValidator.parse(param);
};
