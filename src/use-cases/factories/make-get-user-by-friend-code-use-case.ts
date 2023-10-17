import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserByFriendCodeUseCase } from "../get-user-by-friend-code";

export function makeGetUserByFriendCodeUseCase() {
  const usersRepository = new PrismaUsersRepository();
  return new GetUserByFriendCodeUseCase(usersRepository);
}
