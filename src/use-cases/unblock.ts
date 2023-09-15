import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { BlockRepositoryInterface } from "@/repositories/block-repository-interface";
import { UnblockYourselfError } from "./errors/unblock-yourself-error";
import { AlreadyUnblockedError } from "./errors/already-unblocked-error";
import { BlockedError } from "./errors/blocked-error";

interface UnblockUseCaseRequest {
  user_id: string;
  another_id: string;
}

export class UnblockUseCase {
  constructor(
    private usersRepository: UsersRepositoryInterface,
    private blockRepository: BlockRepositoryInterface,
  ) {}

  async execute({ user_id, another_id }: UnblockUseCaseRequest) {
    const user = await this.usersRepository.findById(another_id);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (user_id === another_id) {
      throw new UnblockYourselfError();
    }

    const isThereBlock = await this.blockRepository.isThereBlock(
      user_id,
      another_id,
    );

    if (!isThereBlock) {
      throw new AlreadyUnblockedError();
    }

    const wereYouBlocked = await this.blockRepository.wereYouBlocked(
      user_id,
      another_id,
    );

    if (wereYouBlocked) {
      throw new BlockedError();
    }

    await this.blockRepository.removeBlock(user_id, another_id);
  }
}
