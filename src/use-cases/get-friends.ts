import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { FriendshipRepositoryInterface } from "@/repositories/friendship-repository-interface";
import { User } from "@prisma/client";

interface GetFriendsUseCaseRequest {
  user_id: string;
}

interface GetFriendsUseCaseResponse {
  friends: User[];
}

export class GetFriendsUseCase {
  private usersRepository: UsersRepositoryInterface;
  private friendshipRepository: FriendshipRepositoryInterface;
  constructor(
    usersRepository: UsersRepositoryInterface,
    friendshipRepository: FriendshipRepositoryInterface,
  ) {
    this.usersRepository = usersRepository;
    this.friendshipRepository = friendshipRepository;
  }

  async execute({
    user_id,
  }: GetFriendsUseCaseRequest): Promise<GetFriendsUseCaseResponse> {
    const friendships = await this.friendshipRepository.getFriendships(user_id);

    if (!friendships) {
      return { friends: [] };
    }

    const friends_ids = friendships.map((friendship) => {
      if (friendship.sent_id === user_id) return friendship.received_id;
      return friendship.sent_id;
    });

    const friends = await this.usersRepository.findMany(friends_ids);

    if (!friends) {
      return { friends: [] };
    }

    return { friends };
  }
}
