import { ProjectStatus } from "@prisma/client";
import { z } from "zod";
import { validationErrorMessages } from ".";

const editProjectValidator = z.object({
  id: z
    .number({
      invalid_type_error: validationErrorMessages.invalidType("id", "number"),
    })
    .optional(),
  ownerId: z.number({
    invalid_type_error: validationErrorMessages.invalidType(
      "ownerId",
      "number"
    ),
  }),
  name: z
    .string({
      required_error: validationErrorMessages.required("nome"),
      invalid_type_error: validationErrorMessages.invalidType("nome", "string"),
    })
    .max(200, validationErrorMessages.max("nome", 200))
    .min(2, validationErrorMessages.min("nome", 2)),
  description: z
    .string({
      required_error: validationErrorMessages.required("description"),
      invalid_type_error: validationErrorMessages.invalidType(
        "description",
        "string"
      ),
    })
    .max(250, validationErrorMessages.max("description", 1000))
    .min(1, validationErrorMessages.min("description", 5)),
  status: z.nativeEnum(ProjectStatus).optional(),

  startDate: z
    .string({
      invalid_type_error: validationErrorMessages.invalidType(
        "data de início",
        "string"
      ),
    })
    .optional(),

  endDate: z
    .string({
      required_error: validationErrorMessages.required("data de termino"),
      invalid_type_error: validationErrorMessages.invalidType(
        "data de termino",
        "string"
      ),
    })
    .min(1, validationErrorMessages.min("data de termino", 1)),
});

export type EditProjectValidationParams = Omit<
  z.infer<typeof editProjectValidator>,
  "id"
>;

export const editProjectValidate = (
  param: Partial<EditProjectValidationParams>
) => {
  return editProjectValidator.parse(param);
};
