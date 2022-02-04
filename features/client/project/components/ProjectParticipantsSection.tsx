import { ProjectParticipant } from "@prisma/client";
import React, { useState } from "react";
import { MyProjectParticipant } from "../../../shared/models/myProjectParticipant";

type Props = {
  participants: MyProjectParticipant[];
};

const ProjectParticipantsSection = ({ participants }: Props) => {
  const [currId, setCurrId] = useState<number>();

  const formatName = (participant: MyProjectParticipant) => {
    const [first, last] = participant.user.name.split(" ");
    return last ? first[0] + last[0] : first.substring(0, 2);
  };

  const isParticipant = (participant: MyProjectParticipant) => {
    return participant.id === currId;
  };

  const handleSelectParticipant = (participant: MyProjectParticipant) => {
    setCurrId(participant.id);
  };

  return (
    <section className='flex flex-col space-y-4 items-baseline md:flex-row md:space-x-4'>
      <h5 className='text-2xl text-brand-gray-1'>Participantes:</h5>
      <ul className='flex items-center w-full overflow-x-auto pb-4 space-x-4'>
        {participants.map((participant) => (
          <li
            role='button'
            onClick={() => handleSelectParticipant(participant)}
            key={participant.id}
            className={`flex-shrink-0 bg-brand-gray-2/50 rounded-full h-12 flex items-center justify-center text-xl transition-all duration-500  ease-in-out ${
              isParticipant(participant) ? "w-auto px-4" : "w-12 px-0"
            } `}
          >
            {isParticipant(participant)
              ? participant.user.name
              : formatName(participant) || "Desconhecido"}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectParticipantsSection;
