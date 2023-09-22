import { PrismaSpinRepository } from "@/repositories/prisma/prisma-spin-repository";
import { PrismaParticipateSpinRepository } from "@/repositories/prisma/prisma-participate-spin-repository";
import { LeaveSpinUseCase } from "../leave-spin";

export function makeLeaveSpinUseCase() {
  const spinRepository = new PrismaSpinRepository();
  const participateSpinRepository = new PrismaParticipateSpinRepository();
  return new LeaveSpinUseCase(spinRepository, participateSpinRepository);
}
