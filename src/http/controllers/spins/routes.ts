import express from "express";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createSpin } from "./create-spin";

export const spinsRoutes = express.Router();

spinsRoutes.post("/spins", verifyJWT, createSpin);
