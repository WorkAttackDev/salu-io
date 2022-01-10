import { z } from "zod";
import { validationErrorMessages } from ".";

const editBroaValidator = z.object({
  id: z
    .number({
      invalid_type_error: validationErrorMessages.invalidType("id", "number"),
    })
    .optional(),
  userId: z.number({
    invalid_type_error: validationErrorMessages.invalidType("userId", "number"),
  }),
  author: z
    .string({
      required_error: validationErrorMessages.required("autor"),
      invalid_type_error: validationErrorMessages.invalidType(
        "autor",
        "string"
      ),
    })
    .max(50, validationErrorMessages.max("autor", 50))
    .min(1, validationErrorMessages.min("autor", 1)),
  wrongVersion: z
    .string({
      required_error: validationErrorMessages.required("versão da broa"),
      invalid_type_error: validationErrorMessages.invalidType(
        "versão da broa",
        "string"
      ),
    })
    .max(250, validationErrorMessages.max("versão da broa", 250))
    .min(1, validationErrorMessages.min("versão da broa", 1)),
  rightVersion: z
    .string({
      required_error: validationErrorMessages.required("versão correta"),
      invalid_type_error: validationErrorMessages.invalidType(
        "versão correta",
        "string"
      ),
    })
    .max(250, validationErrorMessages.max("versão correta", 250))
    .min(1, validationErrorMessages.min("versão correta", 1)),
});

export type EditBroaValidationParams = Omit<
  z.infer<typeof editBroaValidator>,
  "id"
>;

export const editBroaValidate = (param: Partial<EditBroaValidationParams>) => {
  return editBroaValidator.parse(param);
};
