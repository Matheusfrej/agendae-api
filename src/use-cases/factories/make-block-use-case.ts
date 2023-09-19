import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaFriendshipRepository } from "@/repositories/prisma/prisma-friendship-repository";
import { PrismaBlockRepository } from "@/repositories/prisma/prisma-block-repository";
import { BlockUseCase } from "../block";

export function makeBlockUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const friendshipRepository = new PrismaFriendshipRepository();
  const blockRepository = new PrismaBlockRepository();
  return new BlockUseCase(
    usersRepository,
    friendshipRepository,
    blockRepository,
  );
}
