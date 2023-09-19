import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { LoginUseCase } from "../login";

export function makeLoginUseCase() {
  const usersRepository = new PrismaUsersRepository();
  return new LoginUseCase(usersRepository);
}
