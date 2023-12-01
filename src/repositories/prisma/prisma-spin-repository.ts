import { Spin, ParticipateSpin } from "@prisma/client";
import {
  CreateSpinRepositoryInterface,
  SpinRepositoryInterface,
  UpdateSpinRepositoryInterface,
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

  async createSpin(
    data: CreateSpinRepositoryInterface,
    participants: string[],
  ): Promise<Spin | null> {
    const spin = await prisma.spin.create({
      data,
    });

    const formattedParticipants = participants.map((id) => {
      return {
        spin_id: spin.id,
        received_id: id,
      };
    });

    await prisma.participateSpin.createMany({
      data: formattedParticipants,
      skipDuplicates: true,
    });

    return spin;
  }

  async findById(id: string) {
    const spin = await prisma.spin.findUnique({
      where: {
        id,
      },
    });

    return spin;
  }

  async findByIdAndUpdate(
    spin_id: string,
    data: UpdateSpinRepositoryInterface,
    participants: string[],
  ): Promise<Spin | null> {
    const spin = await prisma.spin.update({
      where: {
        id: spin_id,
      },
      data: {
        title: data.title,
        description: data.description,
        theme_color: data.theme_color,
        place: data.place,
        start_date: data.start_date === undefined ? null : data.start_date,
        has_start_time: data.has_start_time,
        end_date: data.end_date === undefined ? null : data.end_date,
        has_end_time: data.has_end_time,
      },
    });

    await prisma.participateSpin.deleteMany({
      where: {
        AND: [
          {
            spin_id,
          },
          {
            NOT: {
              status: 2,
            },
          },
        ],
      },
    });

    /* 
      Percorre pelos novos participantes, criando
      um novo convite se ainda não tinha sido convidado
      e reconvidando quem recusou e foi reconvidado.
    */
    participants.forEach(async (id) => {
      const participant = await prisma.participateSpin.findFirst({
        where: {
          spin_id,
          received_id: id,
        },
      });

      if (participant) {
        await prisma.participateSpin.update({
          where: {
            id: participant.id,
          },
          data: {
            status: 0,
          },
        });
      } else {
        await prisma.participateSpin.create({
          data: {
            spin_id,
            received_id: id,
          },
        });
      }
    });

    return spin;
  }

  async findByIdAndDelete(id: string) {
    const spin = await prisma.spin.delete({
      where: {
        id,
      },
    });

    return spin;
  }
}
