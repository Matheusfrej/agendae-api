import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { SendPasswordLinkUseCase } from "../send-password-link";

export function makeSendPasswordLinkUseCase() {
  const usersRepository = new PrismaUsersRepository();
  return new SendPasswordLinkUseCase(usersRepository);
}
