import express from "express";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createSpin } from "./create-spin";
import { getSpin } from "./get-spin";

export const spinsRoutes = express.Router();

spinsRoutes.post("/spins", verifyJWT, createSpin);
spinsRoutes.get("/spins/:id", getSpin);
// spinsRoutes.put("/spins", verifyJWT, editSpin);
// spinsRoutes.delete("/spins/:id", verifyJWT, deleteSpin);
