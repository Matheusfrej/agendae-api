import { PrismaSpinRepository } from "@/repositories/prisma/prisma-spin-repository";
import { GetSpinUseCase } from "../get-spin";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeGetSpinUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const spinRepository = new PrismaSpinRepository();
  return new GetSpinUseCase(usersRepository, spinRepository);
}
