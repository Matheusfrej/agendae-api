import { prisma } from "@/lib/prisma";
import { ParticipateSpinRepositoryInterface } from "../participate-spin-repository-interface";

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
}
