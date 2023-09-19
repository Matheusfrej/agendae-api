import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaFriendshipRepository } from "@/repositories/prisma/prisma-friendship-repository";
import { AcceptFriendUseCase } from "../accept-friend";
import { PrismaBlockRepository } from "@/repositories/prisma/prisma-block-repository";

export function makeAcceptFriendUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const friendshipRepository = new PrismaFriendshipRepository();
  const blockRepository = new PrismaBlockRepository();
  return new AcceptFriendUseCase(
    usersRepository,
    friendshipRepository,
    blockRepository,
  );
}
