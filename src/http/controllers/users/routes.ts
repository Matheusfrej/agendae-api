import express from "express";
import { register } from "./register";
import { login } from "./login";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { profile } from "./profile";
import { editProfile } from "./edit-profile";

export const usersRoutes = express.Router();

usersRoutes.post("/register", register);
usersRoutes.post("/login", login);
usersRoutes.put("/edit-profile", verifyJWT, editProfile);
usersRoutes.get("/me", verifyJWT, profile);
