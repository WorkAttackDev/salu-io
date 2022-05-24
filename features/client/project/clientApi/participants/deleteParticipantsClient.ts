import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../../shared/types";
import { AxiosInstance } from "../../../core/config/client";

export const deleteParticipantsClient = async (
  projectId: string,
  ownerId: string,
  participantIds: string[]
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
