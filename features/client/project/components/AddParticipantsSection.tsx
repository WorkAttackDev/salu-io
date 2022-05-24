import React, { useEffect } from "react";
import { MyProject } from "../../../shared/models/myProjectTasks";
import { MyUserInfo } from "../../../shared/models/myUser";
import Button from "../../core/components/Button";
import CheckBoxField from "../../core/components/CheckBoxField";
import useApi from "../../core/hooks/use_api";
import { useAuthStore } from "../../core/stores/authStore";
import { useErrorStore } from "../../core/stores/errorStore";
import { addParticipantsClient } from "../clientApi/participants/addParticipantsClient";
import { deleteParticipantsClient } from "../clientApi/participants/deleteParticipantsClient";

type Props = {
  mode?: "add" | "delete";
  project: MyProject;
  usersInfo: MyUserInfo[];
  onReject: () => void;
};

const AddParticipantsSection = ({
  project,
  usersInfo,
  onReject,
  mode = "add",
}: Props) => {
  const user = useAuthStore((state) => state.user);
  const participantsMutation = useApi<
    typeof addParticipantsClient | typeof deleteParticipantsClient
  >();

  const { participants, ownerId } = project;

  const onlyNotParticipantsFilter = (user: MyUserInfo): boolean => {
    if (!participants) return user.id !== ownerId;

    return (
      user.id !== ownerId && participants.every((p) => p.userId !== user.id)
    );
  };

  const onlyParticipantsFilter = (user: MyUserInfo): boolean => {
    if (!participants) return user.id !== ownerId;

    return (
      user.id !== ownerId && participants.some((p) => p.userId === user.id)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    const formData = new FormData(e.currentTarget);

    const userIds = Array.from(formData.entries()).map(([, value]) =>
      value.toString()
    );

    if (!userIds.length) return;

    if (mode === "add") {
      const res = await participantsMutation.request(
        addParticipantsClient(project.id, user.id, userIds)
      );

      if (!res) return;

      onReject();
    }

    if (mode === "delete") {
      const res = await participantsMutation.request(
        deleteParticipantsClient(project.id, user.id, userIds)
      );

      if (!res) return;

      onReject();
    }
  };

  return (
    <section>
      <form
        className='flex flex-col max-h-[70vh] overflow-y-auto space-y-2'
        onSubmit={handleSubmit}
      >
        {usersInfo
          .filter(
            mode === "add" ? onlyNotParticipantsFilter : onlyParticipantsFilter
          )
          .map((user) => (
            <CheckBoxField
              id={user.email}
              key={user.id}
              labelText={user.name}
              name='userIds'
              value={user.id}
            />
          ))}

        <span className='flex !mt-8'>
          <Button
            className='mr-8'
            type='button'
            theme='secondary'
            size='sm'
            onClick={onReject}
            disabled={participantsMutation.loading}
          >
            Fechar
          </Button>
          <Button
            size='sm'
            disabled={participantsMutation.loading}
            isLoading={participantsMutation.loading}
          >
            {mode === "add" ? "Adicionar" : "Excluir"}
          </Button>
        </span>
      </form>
    </section>
  );
};

export default AddParticipantsSection;
