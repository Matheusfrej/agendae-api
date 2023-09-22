import { BlockRepositoryInterface } from "@/repositories/block-repository-interface";
import { User } from "@prisma/client";

interface GetBlocksUseCaseRequest {
  user_id: string;
}

interface GetBlocksUseCaseResponse {
  blocks: User[];
}

export class GetBlocksUseCase {
  constructor(private blockRepository: BlockRepositoryInterface) {}

  async execute({
    user_id,
  }: GetBlocksUseCaseRequest): Promise<GetBlocksUseCaseResponse> {
    const blocks = await this.blockRepository.getBlocks(user_id);

    if (!blocks) {
      return { blocks: [] };
    }

    return { blocks };
  }
}
