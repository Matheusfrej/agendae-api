import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { DeleteProfileUseCase } from "../delete-profile";

export function makeDeleteProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const deleteProfileUseCase = new DeleteProfileUseCase(usersRepository);

  return deleteProfileUseCase;
}