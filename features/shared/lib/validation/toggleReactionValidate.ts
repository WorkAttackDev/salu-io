import { BroaReactionType } from "@prisma/client";
import { z } from "zod";
import { validationErrorMessages } from ".";

const toggleReactionValidator = z.object({
  reactionId: z
    .number({
      required_error: validationErrorMessages.required("reactionId"),
      invalid_type_error: validationErrorMessages.invalidType(
        "reactionId",
        "number"
      ),
    })
    .optional(),
  broaId: z.number({
    required_error: validationErrorMessages.required("broaId"),
    invalid_type_error: validationErrorMessages.invalidType("broaId", "number"),
  }),
  userId: z.number({
    required_error: validationErrorMessages.required("broaId"),
    invalid_type_error: validationErrorMessages.invalidType("broaId", "number"),
  }),
  reactionType: z.nativeEnum(BroaReactionType, {
    required_error: validationErrorMessages.required("reactionType"),
    invalid_type_error: validationErrorMessages.invalidType(
      "reactionType",
      "BroaReactionType"
    ),
  }),
});

export type ToggleReactionValidatorParams = z.infer<
  typeof toggleReactionValidator
>;

export const toggleReactionValidate = (
  param: Partial<ToggleReactionValidatorParams>
) => {
  return toggleReactionValidator.parse(param);
};
