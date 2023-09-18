import { Report } from "@prisma/client";

export interface ReportRepositoryInterface {
  createReport(
    user_id: string,
    another_id: string,
    reason?: string,
  ): Promise<Report | null>;
  didYouReport(user_id: string, another_id: string): Promise<boolean>;
}
