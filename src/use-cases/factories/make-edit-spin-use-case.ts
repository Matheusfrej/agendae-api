import { PrismaSpinRepository } from "@/repositories/prisma/prisma-spin-repository";
import { EditSpinUseCase } from "../edit-spin";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaBlockRepository } from "@/repositories/prisma/prisma-block-repository";

export function makeEditSpinUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const spinRepository = new PrismaSpinRepository();
  const blockRepository = new PrismaBlockRepository();
  return new EditSpinUseCase(usersRepository, spinRepository, blockRepository);
}
