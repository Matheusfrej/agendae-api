import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaReportRepository } from "@/repositories/prisma/prisma-report-repository";
import { ReportUseCase } from "../report";

export function makeReportUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const reportRepository = new PrismaReportRepository();
  const reportUseCase = new ReportUseCase(usersRepository, reportRepository);

  return reportUseCase;
}
