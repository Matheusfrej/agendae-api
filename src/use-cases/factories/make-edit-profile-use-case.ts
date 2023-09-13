import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { EditProfileUseCase } from "../edit-profile";

export function makeEditProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const editProfileUseCase = new EditProfileUseCase(usersRepository);

  return editProfileUseCase;
}
