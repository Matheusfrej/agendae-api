import express from "express";
import { register } from "./register";
import { login } from "./login";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { profile } from "./profile";
import { editProfile } from "./edit-profile";
import { deleteProfile } from "./delete-profile";
import { addFriend } from "./add-friend";
import { removeFriend } from "./remove-friend";

export const usersRoutes = express.Router();

usersRoutes.post("/register", register);

usersRoutes.post("/login", login);

usersRoutes.put("/profile", verifyJWT, editProfile);
usersRoutes.delete("/profile", verifyJWT, deleteProfile);

usersRoutes.post("/add-friend", verifyJWT, addFriend);
usersRoutes.post("/remove-friend", verifyJWT, removeFriend);

usersRoutes.get("/me", verifyJWT, profile);
