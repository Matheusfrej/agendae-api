import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaSpinRepository } from "@/repositories/prisma/prisma-spin-repository";
import { PrismaParticipateSpinRepository } from "@/repositories/prisma/prisma-participate-spin-repository";
import { InviteSpinUseCase } from "../invite-spin";
import { PrismaBlockRepository } from "@/repositories/prisma/prisma-block-repository";

export function makeInviteSpinUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const spinRepository = new PrismaSpinRepository();
  const participateSpinRepository = new PrismaParticipateSpinRepository();
  const blockRepository = new PrismaBlockRepository();
  return new InviteSpinUseCase(
    usersRepository,
    spinRepository,
    participateSpinRepository,
    blockRepository,
  );
}
