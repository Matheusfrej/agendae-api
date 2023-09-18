import { prisma } from "@/lib/prisma";
import { Report } from "@prisma/client";
import { ReportRepositoryInterface } from "../report-repository-interface";

export class PrismaReportRepository implements ReportRepositoryInterface {
  async createReport(
    user_id: string,
    another_id: string,
    reason: string,
  ): Promise<Report | null> {
    const report = await prisma.report.create({
      data: {
        reporter_id: user_id,
        reported_id: another_id,
        reason,
      },
    });

    return report;
  }

  async didYouReport(user_id: string, another_id: string): Promise<boolean> {
    const isReported = await prisma.report.findFirst({
      where: {
        reporter_id: user_id,
        reported_id: another_id,
      },
    });
    return isReported !== null;
  }
}
