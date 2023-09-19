import { SpinNotFoundError } from "@/use-cases/errors/spin-not-found-error";
import { makeGetSpinUseCase } from "@/use-cases/factories/make-get-spin-use-case";
import { NextFunction, Request, Response } from "express";

export async function getSpin(req: Request, res: Response, next: NextFunction) {
  try {
    const spinUseCase = makeGetSpinUseCase();

    const { id } = req.params;

    const spin = await spinUseCase.execute({
      spin_id: id,
    });

    return res.status(200).send(spin);
  } catch (err) {
    if (err instanceof SpinNotFoundError) {
      return res.status(404).send({ message: err.message });
    }

    return next(err);
  }
}
