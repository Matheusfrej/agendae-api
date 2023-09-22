import { PrismaParticipateSpinRepository } from "@/repositories/prisma/prisma-participate-spin-repository";
import { PrismaSpinRepository } from "@/repositories/prisma/prisma-spin-repository";
import { GetParticipantsUseCase } from "../get-participants";

export function makeGetParticipantsUseCase() {
  const spinRepository = new PrismaSpinRepository();
  const participateSpinRepository = new PrismaParticipateSpinRepository();
  return new GetParticipantsUseCase(spinRepository, participateSpinRepository);
}
