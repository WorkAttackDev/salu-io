import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../../shared/types";
import { AxiosInstance } from "../../../core/config/client";

export const deleteParticipantsClient = async (
  projectId: number,
  ownerId: number,
  participantIds: number[]
) => {
  const res = await AxiosInstance.delete<
    any,
    AxiosResponse<ApiResponse<boolean>>
  >("/projects/participants", {
    data: {
      projectId,
      ownerId,
      participantIds,
    },
  });

  return res.data.data;
};
