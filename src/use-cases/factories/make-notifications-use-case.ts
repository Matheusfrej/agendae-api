import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { NotificationsUseCase } from "../notifications";

export function makeNotificationsUseCase() {
  const usersRepository = new PrismaUsersRepository();
  return new NotificationsUseCase(usersRepository);
}
