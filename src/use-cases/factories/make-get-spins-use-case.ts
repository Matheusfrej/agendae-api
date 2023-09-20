import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetSpinsUseCase } from "../get-spins";

export function makeGetSpinsUseCase() {
  const usersRepository = new PrismaUsersRepository();
  return new GetSpinsUseCase(usersRepository);
}
