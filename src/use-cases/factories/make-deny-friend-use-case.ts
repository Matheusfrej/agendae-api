import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaFriendshipRepository } from "@/repositories/prisma/prisma-friendship-repository";
import { DenyFriendUseCase } from "../deny-friend";

export function makeDenyFriendUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const friendshipRepository = new PrismaFriendshipRepository();
  const denyFriendUseCase = new DenyFriendUseCase(
    usersRepository,
    friendshipRepository,
  );

  return denyFriendUseCase;
}
