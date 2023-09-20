import { PrismaSpinRepository } from "@/repositories/prisma/prisma-spin-repository";
import { DeleteSpinUseCase } from "../delete-spin";

export function makeDeleteSpinUseCase() {
  const spinRepository = new PrismaSpinRepository();
  return new DeleteSpinUseCase(spinRepository);
}
