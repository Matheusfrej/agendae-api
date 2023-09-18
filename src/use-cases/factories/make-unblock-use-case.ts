import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaBlockRepository } from "@/repositories/prisma/prisma-block-repository";
import { UnblockUseCase } from "../unblock";

export function makeUnblockUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const blockRepository = new PrismaBlockRepository();
  const unblockUseCase = new UnblockUseCase(usersRepository, blockRepository);

  return unblockUseCase;
}
