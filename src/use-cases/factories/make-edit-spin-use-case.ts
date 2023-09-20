import { PrismaSpinRepository } from "@/repositories/prisma/prisma-spin-repository";
import { EditSpinUseCase } from "../edit-spin";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeEditSpinUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const spinRepository = new PrismaSpinRepository();
  return new EditSpinUseCase(usersRepository, spinRepository);
}
