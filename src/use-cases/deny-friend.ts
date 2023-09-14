import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { FriendshipRepositoryInterface } from "@/repositories/friendship-repository-interface";
import { AlreadyFriendError } from "./errors/already-friend-error";
import { DenyFriendError } from "./errors/deny-friend-error";
import { DenyYourselfError } from "./errors/deny-yourself-error";

interface DenyFriendUseCaseRequest {
  user_id: string;
  friend_id: string;
}

export class DenyFriendUseCase {
  constructor(
    private usersRepository: UsersRepositoryInterface,
    private friendshipRepository: FriendshipRepositoryInterface,
  ) {}

  async execute({ user_id, friend_id }: DenyFriendUseCaseRequest) {
    const friend = await this.usersRepository.findById(friend_id);

    if (!friend) {
      throw new UserNotFoundError();
    }

    if (user_id === friend_id) {
      throw new DenyYourselfError();
    }

    const friendship = await this.friendshipRepository.getFriendship(
      user_id,
      friend_id,
    );

    // There isn't a friendship established
    if (!friendship) {
      throw new DenyFriendError();
      // the friend had sent an invite and it was pending
    } else if (friendship.sent_id === friend_id && friendship.status === 0) {
      const newFriendship = await this.friendshipRepository.denyFriendship(
        user_id,
        friend_id,
      );

      return newFriendship;
      // They are already friends
    } else if (friendship.status === 1) {
      throw new AlreadyFriendError();
    } else {
      throw new DenyFriendError();
    }
  }
}
