import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { FriendshipRepositoryInterface } from "@/repositories/friendship-repository-interface";
import { AddYourselfError } from "./errors/add-yourself-error";
import { AlreadyFriendError } from "./errors/already-friend-error";
import { AcceptFriendError } from "./errors/accept-friend-error";
import { BlockRepositoryInterface } from "@/repositories/block-repository-interface";
import { AddFriendBlockedError } from "./errors/add-friend-blocked-error";

interface AcceptFriendUseCaseRequest {
  user_id: string;
  friend_id: string;
}

export class AcceptFriendUseCase {
  constructor(
    private usersRepository: UsersRepositoryInterface,
    private friendshipRepository: FriendshipRepositoryInterface,
    private blockRepository: BlockRepositoryInterface,
  ) {}

  async execute({ user_id, friend_id }: AcceptFriendUseCaseRequest) {
    const friend = await this.usersRepository.findById(friend_id);

    if (!friend) {
      throw new UserNotFoundError();
    }

    if (user_id === friend_id) {
      throw new AddYourselfError();
    }

    const friendship = await this.friendshipRepository.getFriendship(
      user_id,
      friend_id,
    );

    const isThereBlock = await this.blockRepository.isThereBlock(
      user_id,
      friend_id,
    );

    if (isThereBlock) {
      if (friendship) {
        await this.friendshipRepository.removeFriendship(user_id, friend_id);
      }

      throw new AddFriendBlockedError();
    }

    // There isn't a friendship established
    if (!friendship) {
      throw new AcceptFriendError();
      // the friend had sent an invite and it was pending
    } else if (friendship.sent_id === friend_id && friendship.status === 0) {
      const newFriendship = await this.friendshipRepository.acceptFriendship(
        user_id,
        friend_id,
      );

      return newFriendship;
      // They are already friends
    } else if (friendship.status === 1) {
      throw new AlreadyFriendError();
    } else {
      throw new AcceptFriendError();
    }
  }
}
