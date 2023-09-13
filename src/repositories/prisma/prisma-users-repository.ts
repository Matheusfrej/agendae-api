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
}
