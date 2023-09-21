import { PrismaParticipateSpinRepository } from "@/repositories/prisma/prisma-participate-spin-repository";
import { AcceptInviteUseCase } from "../accept-invite";

export function makeAcceptInviteUseCase() {
  const participateSpinRepository = new PrismaParticipateSpinRepository();
  return new AcceptInviteUseCase(participateSpinRepository);
}
