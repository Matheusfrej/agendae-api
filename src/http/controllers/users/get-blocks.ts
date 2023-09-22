import { PreConditionalError } from "@/use-cases/errors/pre-conditional-error";
import { makeGetBlocksUseCase } from "@/use-cases/factories/make-get-blocks-use-case";
import { NextFunction, Request, Response } from "express";

export async function getBlocks(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const getBlocksUseCase = makeGetBlocksUseCase();

    const { user_id } = req.body.user_id;

    const blocks = await getBlocksUseCase.execute({
      user_id,
    });

    const usersBlockedWithoutPassword = blocks.blocks.map((block) => {
      return { ...block, password: undefined };
    });

    return res.status(200).send({ blocks: usersBlockedWithoutPassword });
  } catch (err) {
    if (err instanceof PreConditionalError) {
      return res.status(err.httpCode).send({ message: err.message });
    }

    return next(err);
  }
}
