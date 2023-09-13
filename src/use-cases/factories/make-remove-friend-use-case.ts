import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaFriendshipRepository } from "@/repositories/prisma/prisma-friendship-repository";
import { RemoveFriendUseCase } from "../remove-friend";

export function makerRemoveFriendUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const friendshipRepository = new PrismaFriendshipRepository();
  const removeFriendProfileUseCase = new RemoveFriendUseCase(
    usersRepository,
    friendshipRepository,
  );

  return removeFriendProfileUseCase;
}
