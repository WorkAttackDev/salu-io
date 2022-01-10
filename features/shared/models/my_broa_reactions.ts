import { Broa, BroaReaction } from "@prisma/client";

export type MyBroaReactions = Broa & {
  reactions: BroaReaction[] | undefined;
};
