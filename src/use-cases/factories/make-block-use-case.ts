import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaFriendshipRepository } from "@/repositories/prisma/prisma-friendship-repository";
import { PrismaBlockRepository } from "@/repositories/prisma/prisma-block-repository";
import { BlockUseCase } from "../block-use-case";

export function makeBlockUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const friendshipRepository = new PrismaFriendshipRepository();
  const blockRepository = new PrismaBlockRepository();
  const blockUseCase = new BlockUseCase(
    usersRepository,
    friendshipRepository,
    blockRepository,
  );

  return blockUseCase;
}
