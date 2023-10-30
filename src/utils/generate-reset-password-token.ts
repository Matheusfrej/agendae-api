import jwt from "jsonwebtoken";
import { env } from "@/env";

export function generateChangePasswordToken(email: string) {
  return jwt.sign({ email }, env.JWT_SECRET, {
    expiresIn: "15m",
  });
}
