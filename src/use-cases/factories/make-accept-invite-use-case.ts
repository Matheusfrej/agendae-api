import { PrismaParticipateSpinRepository } from "@/repositories/prisma/prisma-participate-spin-repository";
import { AcceptInviteUseCase } from "../accept-invite";
import { PrismaBlockRepository } from "@/repositories/prisma/prisma-block-repository";
import { PrismaSpinRepository } from "@/repositories/prisma/prisma-spin-repository";

export function makeAcceptInviteUseCase() {
  const participateSpinRepository = new PrismaParticipateSpinRepository();
  const blockRepository = new PrismaBlockRepository();
  const spinRepository = new PrismaSpinRepository();
  return new AcceptInviteUseCase(
    participateSpinRepository,
    spinRepository,
    blockRepository,
  );
}
