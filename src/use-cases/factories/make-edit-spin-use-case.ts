import { PrismaSpinRepository } from "@/repositories/prisma/prisma-spin-repository";
import { EditSpinUseCase } from "../edit-spin";

export function makeEditSpinUseCase() {
  const spinRepository = new PrismaSpinRepository();
  return new EditSpinUseCase(spinRepository);
}
