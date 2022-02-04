import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../../shared/types";
import { AxiosInstance } from "../../../core/config/client";

export const addParticipantsClient = async (
  projectId: number,
  ownerId: number,
  participantIds: number[]
) => {
  const res = await AxiosInstance.post<
    any,
    AxiosResponse<ApiResponse<boolean>>
  >("/projects/participants", {
    projectId,
    ownerId,
    participantIds,
  });

  return res.data.data;
};
