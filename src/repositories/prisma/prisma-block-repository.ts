import { prisma } from "@/lib/prisma";
import { BlockRepositoryInterface } from "../block-repository-interface";
import { Block, User } from "@prisma/client";

export class PrismaBlockRepository implements BlockRepositoryInterface {
  async removeBlock(
    user_id: string,
    another_id: string,
  ): Promise<Block | null> {
    const block = await prisma.block.delete({
      where: {
        blocker_id_blocked_id: {
          blocker_id: user_id,
          blocked_id: another_id,
        },
      },
    });

    return block;
  }

  async createBlock(
    user_id: string,
    another_id: string,
  ): Promise<Block | null> {
    const block = await prisma.block.create({
      data: {
        blocker_id: user_id,
        blocked_id: another_id,
      },
    });

    return block;
  }

  async didYouBlock(user_id: string, another_id: string): Promise<boolean> {
    const isBlocked = await prisma.block.findFirst({
      where: {
        blocked_id: another_id,
        blocker_id: user_id,
      },
    });
    return isBlocked !== null;
  }

  async wereYouBlocked(user_id: string, another_id: string): Promise<boolean> {
    const isBlocked = await prisma.block.findFirst({
      where: {
        blocked_id: user_id,
        blocker_id: another_id,
      },
    });
    return isBlocked !== null;
  }

  async isThereBlock(user_id: string, another_id: string): Promise<boolean> {
    const isBlocked = await prisma.block.findFirst({
      where: {
        OR: [
          {
            blocked_id: user_id,
            blocker_id: another_id,
          },
          {
            blocked_id: another_id,
            blocker_id: user_id,
          },
        ],
      },
    });
    return isBlocked !== null;
  }

  async getBlocks(user_id: string): Promise<User[] | null> {
    const blocks = await prisma.block.findMany({
      where: {
        blocker_id: user_id,
      },
      select: {
        blocked: true,
      },
    });

    return blocks.map((block) => block.blocked);
  }
}
