import { NextApiResponse } from "next";
import { ValidationError } from "./validation";

export const handleServerError = (
  res: NextApiResponse,
  status: number,
  messages: string[]
) => {
  res.status(status).json({ data: null, errors: messages });
};

export const handleServerValidationError = (
  res: NextApiResponse,
  status: number,
  err: any
) => {
  const error = err as ValidationError;
  console.log(error);

  res
    .status(status)
    .json({ data: null, errors: error.errors?.map((err) => err.message) });
};
