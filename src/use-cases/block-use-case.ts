import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { FriendshipRepositoryInterface } from "@/repositories/friendship-repository-interface";
import { BlockRepositoryInterface } from "@/repositories/block-repository-interface";
import { BlockYourselfError } from "./errors/block-yourself-error";
import { AlreadyBlockError } from "./errors/already-block-error";
import { AlreadyBlockedError } from "./errors/already-blocked-error";

interface BlockUseCaseRequest {
  user_id: string;
  another_id: string;
}

export class BlockUseCase {
  constructor(
    private usersRepository: UsersRepositoryInterface,
    private friendshipRepository: FriendshipRepositoryInterface,
    private blockRepository: BlockRepositoryInterface,
  ) {}

  async execute({ user_id, another_id }: BlockUseCaseRequest) {
    const user = await this.usersRepository.findById(another_id);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (user_id === another_id) {
      throw new BlockYourselfError();
    }

    await this.friendshipRepository.removeFriendship(user_id, another_id);

    const didYouBlock = await this.blockRepository.didYouBlock(
      user_id,
      another_id,
    );

    if (didYouBlock) {
      throw new AlreadyBlockError();
    }

    const wereYouBlocked = await this.blockRepository.wereYouBlocked(
      user_id,
      another_id,
    );

    if (wereYouBlocked) {
      throw new AlreadyBlockedError();
    }

    await this.blockRepository.createBlock(user_id, another_id);
  }
}
