import { PrismaSpinRepository } from "@/repositories/prisma/prisma-spin-repository";
import { CreateSpinUseCase } from "../create-spin";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaBlockRepository } from "@/repositories/prisma/prisma-block-repository";

export function makeCreateSpinUseCase() {
  const spinRepository = new PrismaSpinRepository();
  const usersRepository = new PrismaUsersRepository();
  const blockRepository = new PrismaBlockRepository();
  return new CreateSpinUseCase(
    spinRepository,
    usersRepository,
    blockRepository,
  );
}
