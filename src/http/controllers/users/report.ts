import { AlreadyReportedError } from "@/use-cases/errors/already-reported-error";
import { ReportYourselfError } from "@/use-cases/errors/report-yourself-error";
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { makeReportUseCase } from "@/use-cases/factories/make-report-use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function report(req: Request, res: Response, next: NextFunction) {
  try {
    const reportBodySchema = z.object({
      another_id: z.string(),
      reason: z.string().max(500).optional(),
    });

    const reportUseCase = makeReportUseCase();

    const { user_id } = req.body.user_id;

    const { another_id, reason } = reportBodySchema.parse(req.body);

    await reportUseCase.execute({
      user_id,
      another_id,
      reason,
    });

    return res.status(200).send();
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return res.status(401).send({ message: err.message });
    }
    if (
      err instanceof AlreadyReportedError ||
      err instanceof ReportYourselfError
    ) {
      return res.status(409).send({ message: err.message });
    }

    return next(err);
  }
}
