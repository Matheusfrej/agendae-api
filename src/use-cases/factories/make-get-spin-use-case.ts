import { PrismaSpinRepository } from "@/repositories/prisma/prisma-spin-repository";
import { GetSpinUseCase } from "../get-spin";

export function makeGetSpinUseCase() {
  const spinRepository = new PrismaSpinRepository();
  return new GetSpinUseCase(spinRepository);
}
