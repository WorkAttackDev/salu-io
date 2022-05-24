import { ProjectStatus } from "@prisma/client";
import { z } from "zod";
import { validationErrorMessages } from ".";

const editTaskValidator = z.object({
  id: z
    .string({
      invalid_type_error: validationErrorMessages.invalidType("id", "string"),
    })
    .optional(),
  projectId: z.string({
    required_error: validationErrorMessages.required("projectId"),
    invalid_type_error: validationErrorMessages.invalidType(
      "projectId",
      "string"
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
    .optional(),
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
    .nullable()
    .optional(),
});

export type EditTaskValidationParams = z.infer<typeof editTaskValidator>;

export const editTaskValidate = (param: Partial<EditTaskValidationParams>) => {
  return editTaskValidator.parse(param);
};
