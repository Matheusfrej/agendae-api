import { PrismaSpinRepository } from "@/repositories/prisma/prisma-spin-repository";
import { CreateSpinUseCase } from "../create-spin";

export function makeCreateSpinUseCase() {
  const spinRepository = new PrismaSpinRepository();
  return new CreateSpinUseCase(spinRepository);
}
