import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaSpinRepository } from "@/repositories/prisma/prisma-spin-repository";
import { PrismaParticipateSpinRepository } from "@/repositories/prisma/prisma-participate-spin-repository";
import { InviteSpinUseCase } from "../invite-spin";

export function makeInviteSpinUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const spinRepository = new PrismaSpinRepository();
  const participateSpinRepository = new PrismaParticipateSpinRepository();
  return new InviteSpinUseCase(
    usersRepository,
    spinRepository,
    participateSpinRepository,
  );
}
