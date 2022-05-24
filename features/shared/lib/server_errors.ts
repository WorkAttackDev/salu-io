import { NextApiResponse } from "next";
import { ZodError } from "zod";
import { ValidationError } from "./validation";

export const handleServerError = (
  res: NextApiResponse,
  status: number,
  messages: string[]
) => {
  res.status(status).json({ data: null, errors: messages });
};

//! deprecated
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

export const handleServerErrorV2 = ({
  err,
  messages,
  res,
  status,
}: {
  err: any;
  res: NextApiResponse;
  status: number;
  messages: string[];
}) => {
  console.log(err);
  if (err instanceof ZodError) {
    const error = err as ZodError;
    res
      .status(400)
      .json({ data: null, errors: error.errors?.map((err) => err.message) });
    return;
  }

  if (err.code === "P2002") {
    return res
      .status(400)
      .json({ data: null, errors: ["Está entidade já foi criada!"] });
  }

  res.status(status).json({ data: null, errors: messages });
};
