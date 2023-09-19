import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { ProfileUseCase } from "../profile";
import { PrismaSpinRepository } from "@/repositories/prisma/prisma-spin-repository";
import { PrismaParticipateSpinRepository } from "@/repositories/prisma/prisma-participate-spin-repository";
import { PrismaFriendshipRepository } from "@/repositories/prisma/prisma-friendship-repository";
import { PrismaBlockRepository } from "@/repositories/prisma/prisma-block-repository";
import { PrismaReportRepository } from "@/repositories/prisma/prisma-report-repository";

export function makeProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const friendshipRepository = new PrismaFriendshipRepository();
  const blockRepository = new PrismaBlockRepository();
  const spinsRepository = new PrismaSpinRepository();
  const participateSpinRepository = new PrismaParticipateSpinRepository();
  const reportRepository = new PrismaReportRepository();
  return new ProfileUseCase(
    usersRepository,
    friendshipRepository,
    blockRepository,
    spinsRepository,
    participateSpinRepository,
    reportRepository,
  );
}
