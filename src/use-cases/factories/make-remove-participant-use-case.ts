import { PrismaSpinRepository } from "@/repositories/prisma/prisma-spin-repository";
import { PrismaParticipateSpinRepository } from "@/repositories/prisma/prisma-participate-spin-repository";
import { RemoveParticipantUseCase } from "../remove-participant";

export function makeRemoveParticipantUseCase() {
  const spinRepository = new PrismaSpinRepository();
  const participateSpinRepository = new PrismaParticipateSpinRepository();
  return new RemoveParticipantUseCase(
    spinRepository,
    participateSpinRepository,
  );
}
