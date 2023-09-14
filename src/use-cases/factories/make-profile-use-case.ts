import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { ProfileUseCase } from "../profile";
import { PrismaSpinRepository } from "@/repositories/prisma/prisma-spin-repository";
import { PrismaParticipateSpinRepository } from "@/repositories/prisma/prisma-participate-spin-repository";

export function makeProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const spinsRepository = new PrismaSpinRepository();
  const participateSpinRepository = new PrismaParticipateSpinRepository();
  const profileUseCase = new ProfileUseCase(
    usersRepository,
    spinsRepository,
    participateSpinRepository,
  );

  return profileUseCase;
}
