import { Spin } from "@prisma/client";
import {
  CreateSpinRepositoryInterface,
  SpinRepositoryInterface,
} from "../spin-repository-interface";
import { prisma } from "@/lib/prisma";

export class PrismaSpinRepository implements SpinRepositoryInterface {
  async getTotalSpinsNumber(organizer_id: string): Promise<number | null> {
    const spinsCount = await prisma.spin.count({
      where: {
        organizer_id,
      },
    });

    return spinsCount;
  }

  async getPastSpinsNumber(organizer_id: string): Promise<number | null> {
    const currDate = new Date();
    const spinsCount = await prisma.spin.count({
      where: {
        OR: [
          {
            end_date: {
              lt: currDate,
            },
          },
          {
            start_date: {
              lt: currDate,
            },
            end_date: null,
          },
        ],
        AND: {
          organizer_id,
        },
      },
    });

    return spinsCount;
  }

  async createSpin(data: CreateSpinRepositoryInterface): Promise<Spin | null> {
    const spin = await prisma.spin.create({
      data,
    });

    return spin;
  }
}
