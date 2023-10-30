import express, { NextFunction, Request, Response } from "express";
import { usersRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import { env } from "./env";
import cors from "cors";
import { spinsRoutes } from "./http/controllers/spins/routes";

export const app = express();

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: "Erro de validação.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return res.status(500).json({ message: "Erro interno do servidor" });
};

app.use(cors());
app.use(express.json());
app.use(usersRoutes);
app.use(spinsRoutes);

app.use(errorHandler);
