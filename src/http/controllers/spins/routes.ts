import express from "express";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createSpin } from "./create-spin";
import { getSpin } from "./get-spin";
import { editSpin } from "./edit-spin";
import { deleteSpin } from "./delete-spin";
import { getSpins } from "./get-spins";

export const spinsRoutes = express.Router();

spinsRoutes.post("/spins", verifyJWT, createSpin);
spinsRoutes.get("/spins/:id", getSpin);
spinsRoutes.get("/spins", verifyJWT, getSpins);
spinsRoutes.put("/spins/:id", verifyJWT, editSpin);
spinsRoutes.delete("/spins/:id", verifyJWT, deleteSpin);
