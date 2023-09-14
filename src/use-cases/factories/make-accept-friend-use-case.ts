import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaFriendshipRepository } from "@/repositories/prisma/prisma-friendship-repository";
import { AcceptFriendUseCase } from "../accept-friend";

export function makeAcceptFriendUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const friendshipRepository = new PrismaFriendshipRepository();
  const addFriendUseCase = new AcceptFriendUseCase(
    usersRepository,
    friendshipRepository,
  );

  return addFriendUseCase;
}
