import { FriendshipRepositoryInterface } from "../friendship-repository-interface";
import { prisma } from "@/lib/prisma";

export class PrismaFriendshipRepository
  implements FriendshipRepositoryInterface
{
  async createFriendship(user_id: string, friend_id: string) {
    const friendship = await prisma.friendship.create({
      data: {
        sent_id: user_id,
        received_id: friend_id,
      },
    });

    return friendship;
  }

  async acceptFriendship(user_id: string, friend_id: string) {
    const friendship = prisma.friendship.update({
      where: {
        sent_id_received_id: {
          sent_id: friend_id,
          received_id: user_id,
        },
      },
      data: {
        status: 1,
      },
    });

    return friendship;
  }

  async denyFriendship(user_id: string, friend_id: string) {
    const friendship = prisma.friendship.delete({
      where: {
        sent_id_received_id: {
          sent_id: friend_id,
          received_id: user_id,
        },
      },
    });

    return friendship;
  }

  async getFriendship(user_id: string, friend_id: string) {
    const friendship = prisma.friendship.findFirst({
      where: {
        OR: [
          {
            sent_id: user_id,
            received_id: friend_id,
          },
          {
            sent_id: friend_id,
            received_id: user_id,
          },
        ],
      },
    });

    return friendship;
  }
}
