import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserIdByEmailUseCase } from "../get-user-id-by-email";

export function makeGetUserIdByEmailUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const addFriendProfileUseCase = new GetUserIdByEmailUseCase(usersRepository);

  return addFriendProfileUseCase;
}
