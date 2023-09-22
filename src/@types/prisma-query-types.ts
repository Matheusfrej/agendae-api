import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { Prisma } from "@prisma/client";

const prismaUsersRepository = new PrismaUsersRepository();

type AllUserSpinsType = Prisma.PromiseReturnType<
  typeof prismaUsersRepository.findAllUserSpins
>;

export { AllUserSpinsType };
