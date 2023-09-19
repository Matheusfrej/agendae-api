import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaFriendshipRepository } from "@/repositories/prisma/prisma-friendship-repository";
import { RemoveFriendUseCase } from "../remove-friend";

export function makeRemoveFriendUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const friendshipRepository = new PrismaFriendshipRepository();
  return new RemoveFriendUseCase(usersRepository, friendshipRepository);
}
