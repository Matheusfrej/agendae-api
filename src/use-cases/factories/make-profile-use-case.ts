import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { ProfileUseCase } from "../profile";

export function makeProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const profileUseCase = new ProfileUseCase(usersRepository);

  return profileUseCase;
}
