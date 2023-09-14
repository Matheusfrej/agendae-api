import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { FriendshipRepositoryInterface } from "@/repositories/friendship-repository-interface";
import { RemoveFriendshipYourselfError } from "./errors/remove-friendship-yourself-error";
import { AlreadyNotFriendError } from "./errors/already-not-friend-error";

interface RemoveFriendUseCaseRequest {
  user_id: string;
  friend_id: string;
}

export class RemoveFriendUseCase {
  constructor(
    private usersRepository: UsersRepositoryInterface,
    private friendshipRepository: FriendshipRepositoryInterface,
  ) {}

  async execute({ user_id, friend_id }: RemoveFriendUseCaseRequest) {
    const friend = await this.usersRepository.findById(friend_id);

    if (!friend) {
      throw new UserNotFoundError();
    }

    if (user_id === friend_id) {
      throw new RemoveFriendshipYourselfError();
    }

    const friendship = await this.friendshipRepository.getFriendship(
      user_id,
      friend_id,
    );

    // There isn't a friendship fully established
    if (!friendship || friendship.status === 0) {
      throw new AlreadyNotFriendError(friend.name);
    }

    // removes independently of who added who
    await this.friendshipRepository.removeFriendship(user_id, friend_id);
  }
}
