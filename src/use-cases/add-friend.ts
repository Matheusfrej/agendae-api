import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { FriendshipRepositoryInterface } from "@/repositories/friendship-repository-interface";
import { AddYourselfError } from "./errors/add-yourself-error";
import { AlreadySentFriendInviteError } from "./errors/already-sent-friend-invite-error";
import { AlreadyFriendError } from "./errors/already-friend-error";

interface AddFriendUseCaseRequest {
  user_id: string;
  friend_id: string;
}

export class AddFriendUseCase {
  private usersRepository: UsersRepositoryInterface;
  private friendshipRepository: FriendshipRepositoryInterface;
  constructor(
    usersRepository: UsersRepositoryInterface,
    friendshipRepository: FriendshipRepositoryInterface,
  ) {
    this.usersRepository = usersRepository;
    this.friendshipRepository = friendshipRepository;
  }

  async execute({ user_id, friend_id }: AddFriendUseCaseRequest) {
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

    // There isn't a friendship established
    if (!friendship) {
      const newFriendship = await this.friendshipRepository.createFriendship(
        user_id,
        friend_id,
      );

      return newFriendship;
      // the friend had already sent an invite and it was pending
    } else if (friendship.sent_id === friend_id && friendship.status === 0) {
      const newFriendship = await this.friendshipRepository.acceptFriendship(
        user_id,
        friend_id,
      );

      return newFriendship;
      // The user already sent an invite and its pending
    } else if (friendship.sent_id === user_id && friendship.status === 0) {
      throw new AlreadySentFriendInviteError();
      // They are already friends
    } else if (friendship.status === 1) {
      throw new AlreadyFriendError();
    }
  }
}
