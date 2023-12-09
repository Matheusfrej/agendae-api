import { prisma } from "@/lib/prisma";
import { ParticipateSpinRepositoryInterface } from "../participate-spin-repository-interface";
import { ParticipateSpin } from "@prisma/client";
import { getParticipantsType } from "@/@types/prisma-query-types";

export class PrismaParticipateSpinRepository
  implements ParticipateSpinRepositoryInterface
{
  async getParticipateSpinNumber(user_id: string): Promise<number | null> {
    const participateSpinsNumber = await prisma.participateSpin.count({
      where: {
        received_id: user_id,
        status: 1,
      },
    });

    return participateSpinsNumber;
  }

  async getPastParticipateSpinNumber(user_id: string): Promise<number | null> {
    const currDate = new Date();
    const participateSpinsNumber = await prisma.participateSpin.count({
      where: {
        OR: [
          {
            spin: {
              end_date: {
                lt: currDate,
              },
            },
          },
          {
            spin: {
              start_date: {
                lt: currDate,
              },
              end_date: null,
            },
          },
        ],
        AND: {
          received_id: user_id,
          status: 1,
        },
      },
    });

    return participateSpinsNumber;
  }

  async getInvite(
    spin_id: string,
    user_id: string,
  ): Promise<ParticipateSpin | null> {
    const invite = await prisma.participateSpin.findFirst({
      where: {
        spin_id,
        received_id: user_id,
      },
    });

    return invite;
  }

  async inviteUser(
    spin_id: string,
    user_id: string,
  ): Promise<ParticipateSpin | null> {
    const invite = await prisma.participateSpin.create({
      data: {
        spin_id,
        received_id: user_id,
      },
    });

    return invite;
  }

  async inviteUserAgain(id: string): Promise<ParticipateSpin | null> {
    const invite = await prisma.participateSpin.update({
      where: {
        id,
      },
      data: {
        status: 0,
      },
    });

    return invite;
  }

  async acceptInvite(id: string): Promise<ParticipateSpin | null> {
    const invite = await prisma.participateSpin.update({
      where: {
        id,
      },
      data: {
        status: 1,
      },
    });

    return invite;
  }

  async denyInvite(id: string): Promise<ParticipateSpin | null> {
    const invite = await prisma.participateSpin.update({
      where: {
        id,
      },
      data: {
        status: 2,
      },
    });

    return invite;
  }

  async removeInvite(id: string): Promise<ParticipateSpin | null> {
    const invite = await prisma.participateSpin.delete({
      where: {
        id,
      },
    });

    return invite;
  }

  async getParticipants(
    spin_id: string,
  ): Promise<getParticipantsType[] | null> {
    const invite = await prisma.participateSpin.findMany({
      where: {
        spin_id,
      },
      select: {
        spin_id: true,
        status: true,
        received: {
          select: {
            id: true,
            name: true,
            email: true,
            nickname: true,
            friend_code: true,
            is_active: true,
            profile_pic: true,
          },
        },
      },
    });

    return invite;
  }
}
