import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { UsersRepositoryInterface } from "../users-repository-interface";

export class PrismaUsersRepository implements UsersRepositoryInterface {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByIdAndDelete(id: string) {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    return user;
  }

  async findByIdAndUpdate(id: string, name: string) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return user;
  }

  async findMany(ids: string[]) {
    const users = await prisma.user.findMany({
      where: {
        id: { in: ids },
      },
    });

    return users;
  }

  async findAllUserSpins(id: string) {
    const spins = await prisma.user.findMany({
      where: {
        id,
      },
      select: {
        Spin: {
          select: {
            id: true,
            title: true,
            description: true,
            start_date: true,
            end_date: true,
            place: true,
            theme_color: true,
            organizer: {
              select: {
                id: true,
                name: true,
                email: true,
                profile_pic: true,
                created_at: true,
              },
            },
          },
        },
        ParticipateSpin: {
          where: {
            status: 1,
          },
          select: {
            spin: {
              select: {
                id: true,
                title: true,
                description: true,
                start_date: true,
                end_date: true,
                place: true,
                theme_color: true,
                organizer: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    profile_pic: true,
                    created_at: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return spins;
  }
}
