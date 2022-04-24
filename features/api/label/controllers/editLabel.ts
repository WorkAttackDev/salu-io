import { NextApiRequest, NextApiResponse } from "next";
import { handleServerErrorV2 } from "../../../shared/lib/server_errors";
import { editLabelValidate } from "../../../shared/lib/validation/label/editLabel";
import { MyLabel } from "../../../shared/models/MyLabel";
import { ApiResponse } from "../../../shared/types";

const editLabelController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<MyLabel>>
) => {
  try {
    const { name, color, id } = editLabelValidate(req.body);

    const label = await prisma.label.update({
      where: { id },
      data: {
        name,
        color,
      },
    });

    res.status(200).json({ data: label, errors: null });
  } catch (error) {
    handleServerErrorV2({
      err: error,
      messages: ["Ocorreu um erro ao editar label"],
      res,
      status: 500,
    });
  }
};

export default editLabelController;
