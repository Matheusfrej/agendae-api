import express from "express";
import { register } from "./register";
import { login } from "./login";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { profile } from "./profile";
import { editProfile } from "./edit-profile";
import { deleteProfile } from "./delete-profile";

export const usersRoutes = express.Router();

usersRoutes.post("/register", register);
usersRoutes.post("/login", login);
usersRoutes.put("/profile", verifyJWT, editProfile);
usersRoutes.delete("/profile", verifyJWT, deleteProfile);
usersRoutes.get("/me", verifyJWT, profile);
