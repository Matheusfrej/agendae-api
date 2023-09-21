import { PrismaParticipateSpinRepository } from "@/repositories/prisma/prisma-participate-spin-repository";
import { PrismaBlockRepository } from "@/repositories/prisma/prisma-block-repository";
import { PrismaSpinRepository } from "@/repositories/prisma/prisma-spin-repository";
import { DenyInviteUseCase } from "../deny-invite";

export function makeDenyInviteUseCase() {
  const participateSpinRepository = new PrismaParticipateSpinRepository();
  const blockRepository = new PrismaBlockRepository();
  const spinRepository = new PrismaSpinRepository();
  return new DenyInviteUseCase(
    participateSpinRepository,
    spinRepository,
    blockRepository,
  );
}
