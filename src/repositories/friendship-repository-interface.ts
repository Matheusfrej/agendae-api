import { Friendship, Prisma } from "@prisma/client";

export interface FriendshipRepositoryInterface {
  createFriendship(user_id: string, friend_id: string): Promise<Friendship>;
  acceptFriendship(
    user_id: string,
    friend_id: string,
  ): Promise<Friendship | null>;
  denyFriendship(
    user_id: string,
    friend_id: string,
  ): Promise<Friendship | null>;
  getFriendship(user_id: string, friend_id: string): Promise<Friendship | null>;
  removeFriendship(
    user_id: string,
    friend_id: string,
  ): Promise<Prisma.BatchPayload | null>;
}
