import { PrismaBlockRepository } from "@/repositories/prisma/prisma-block-repository";
import { GetBlocksUseCase } from "../get-blocks";

export function makeGetBlocksUseCase() {
  const blockRepository = new PrismaBlockRepository();
  return new GetBlocksUseCase(blockRepository);
}
