import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { ReportRepositoryInterface } from "@/repositories/report-repository-interface";
import { ReportYourselfError } from "./errors/report-yourself-error";
import { AlreadyReportedError } from "./errors/already-reported-error";

interface ReportUseCaseRequest {
  user_id: string;
  another_id: string;
  reason?: string;
}

export class ReportUseCase {
  constructor(
    private usersRepository: UsersRepositoryInterface,
    private reportRepository: ReportRepositoryInterface,
  ) {}

  async execute({ user_id, another_id, reason }: ReportUseCaseRequest) {
    const user = await this.usersRepository.findById(another_id);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (user_id === another_id) {
      throw new ReportYourselfError();
    }

    const didYouReport = await this.reportRepository.didYouReport(
      user_id,
      another_id,
    );

    if (didYouReport) {
      throw new AlreadyReportedError();
    }

    await this.reportRepository.createReport(user_id, another_id, reason);
  }
}
