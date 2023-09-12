import express from "express";
import { register } from "./register";
import { login } from "./login";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { profile } from "./profile";

export const usersRoutes = express.Router();

usersRoutes.post("/register", register);
usersRoutes.post("/login", login);
usersRoutes.get("/me", verifyJWT, profile);
