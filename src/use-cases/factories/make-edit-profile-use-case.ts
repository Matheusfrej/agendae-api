import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { EditProfileUseCase } from "../edit-profile";

export function makeEditProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  return new EditProfileUseCase(usersRepository);
}
