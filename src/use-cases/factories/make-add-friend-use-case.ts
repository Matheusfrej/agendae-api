import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AddFriendUseCase } from "../add-friend";
import { PrismaFriendshipRepository } from "@/repositories/prisma/prisma-friendship-repository";

export function makeAddFriendUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const friendshipRepository = new PrismaFriendshipRepository();
  const addFriendProfileUseCase = new AddFriendUseCase(
    usersRepository,
    friendshipRepository,
  );

  return addFriendProfileUseCase;
}
