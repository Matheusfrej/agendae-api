import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AddFriendUseCase } from "../add-friend";
import { PrismaFriendshipRepository } from "@/repositories/prisma/prisma-friendship-repository";
import { PrismaBlockRepository } from "@/repositories/prisma/prisma-block-repository";

export function makeAddFriendUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const friendshipRepository = new PrismaFriendshipRepository();
  const blockRepository = new PrismaBlockRepository();
  return new AddFriendUseCase(
    usersRepository,
    friendshipRepository,
    blockRepository,
  );
}
