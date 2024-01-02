import jwt from "jsonwebtoken";
import { env } from "@/env";

export function generateChangePasswordToken(email: string) {
  /*
    Essa função vai ser chamada no momento que um email for enviado para o usuário trocar a senha
  */
  return jwt.sign({ email }, env.JWT_SECRET, {
    expiresIn: "1h",
  });
}
