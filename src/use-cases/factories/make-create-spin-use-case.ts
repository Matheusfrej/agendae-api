import { PrismaSpinRepository } from "@/repositories/prisma/prisma-spin-repository";
import { CreateSpinUseCase } from "../create-spin";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeCreateSpinUseCase() {
  const spinRepository = new PrismaSpinRepository();
  const usersRepository = new PrismaUsersRepository();
  return new CreateSpinUseCase(spinRepository, usersRepository);
}
