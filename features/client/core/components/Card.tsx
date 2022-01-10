import { Broa, BroaReaction } from ".prisma/client";
import {
  CheckIcon,
  EmojiHappyIcon,
  PencilAltIcon,
  XIcon,
} from "@heroicons/react/outline";
import { format } from "date-fns";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { toggleReactionValidate } from "../../../shared/lib/validation/toggleReactionValidate";
import { MyUser } from "../../../shared/models/my_user";
import { toggleReactionClient } from "../../broa/client";
import { links } from "../data/links";
import useApi from "../hooks/use_api";
import { useErrorStore } from "../stores/errorStore";
import { handleClientValidationError } from "../utils/client_errors";
import Button from "./Button";

type Props = {
  broa: Broa & {
    reactions?: BroaReaction[];
  };
  className?: string;
  user: MyUser | null;
};

const Card = ({ broa, className = "", user }: Props) => {
  const toggleReactionMutation = useApi<typeof toggleReactionClient>();

  const { setErrors, setIsOpen } = useErrorStore();

  const [userReaction, setUserReaction] = React.useState<BroaReaction | null>();

  const [editorMode, setEditorMode] = React.useState(false);
  const [localBroa, setLocalBroa] = React.useState<
    | (Broa & {
        reactions?: BroaReaction[];
      })
    | undefined
  >(broa);

  useEffect(() => {
    const foundedReaction = broa.reactions?.find((r) => r.userId === user?.id);

    setUserReaction(foundedReaction);
    setEditorMode(broa?.userId === user?.id || user?.role === "ADMIN");
  }, [user, broa]);

  useEffect(() => {
    if (!toggleReactionMutation.error) return;

    setErrors(toggleReactionMutation.error);
    setIsOpen(true);
  }, [toggleReactionMutation.error]);

  const handleReaction = useCallback(async () => {
    if (user === null || user === undefined) return;

    try {
      const validatedData = toggleReactionValidate({
        broaId: broa.id,
        userId: user.id,
        reactionType: "HAHA",
        reactionId: userReaction?.id,
      });

      const resBroaReaction = await toggleReactionMutation.request(
        toggleReactionClient(validatedData)
      );

      setUserReaction(resBroaReaction);
      setLocalBroa(resBroaReaction?.broa);
    } catch (error) {
      toggleReactionMutation.setError(handleClientValidationError(error));
    }
  }, [broa, user, userReaction]);

  return (
    <section
      className={`grid gap-4 p-8 bg-white rounded-base shadow-sm ${className}`}
    >
      <header className='flex justify-between items-center text-brand-gray-2'>
        <h6 className=' text-base'>{broa.author}</h6>
        {editorMode && (
          <Link
            key={broa.id}
            href={links.broaById(broa.id.toString())}
            passHref
          >
            <a>
              <PencilAltIcon className='w-6 h-6 cursor-pointer duration-200 hover:text-brand-primary' />
            </a>
          </Link>
        )}
      </header>
      <article className='font-bold'>
        <p className='flex items-center text-2xl text-brand-gray-2 mb-2'>
          {broa.rightVersion}
          <CheckIcon className='w-7 h-7 mb-1 ml-4 text-brand-gray-1' />
        </p>
        <p className='flex items-center text-2xl text-brand-gray-3'>
          {broa.wrongVersion}
          <XIcon className='w-6 h-6 ml-4 text-brand-gray-1' />
        </p>
      </article>
      <footer className='flex justify-between items-center'>
        <Button
          title='dar risada'
          Icon={EmojiHappyIcon}
          size='sm'
          isLoading={toggleReactionMutation.loading}
          disabled={user === null || user === undefined}
          className={`${
            user
              ? userReaction
                ? ""
                : "!bg-brand-gray-1 hover:!bg-brand-primary"
              : "!text-brand-gray-3 !cursor-default"
          }`}
          onClick={handleReaction}
        >
          {localBroa?.reactions?.length ?? 0}
        </Button>
        <p className='text-base text-brand-gray-1'>
          {format(new Date(broa.createdAt), "dd/MM/yyyy 'às' HH:mm")}
        </p>
      </footer>
    </section>
  );
};

export default Card;
