import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaFriendshipRepository } from "@/repositories/prisma/prisma-friendship-repository";
import { GetFriendsUseCase } from "../get-friends";

export function makeGetFriendsUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const friendshipRepository = new PrismaFriendshipRepository();
  const getFriendsUseCase = new GetFriendsUseCase(
    usersRepository,
    friendshipRepository,
  );

  return getFriendsUseCase;
}
