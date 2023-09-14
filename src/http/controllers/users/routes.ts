import express from "express";
import { register } from "./register";
import { login } from "./login";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { editProfile } from "./edit-profile";
import { deleteProfile } from "./delete-profile";
import { addFriend } from "./add-friend";
import { removeFriend } from "./remove-friend";
import { getFriends } from "./get-friends";
import { profile } from "./profile";
import { acceptFriend } from "./accept-friend";

export const usersRoutes = express.Router();

usersRoutes.post("/register", register);

usersRoutes.post("/login", login);

usersRoutes.get("/profile/:id", verifyJWT, profile);
usersRoutes.put("/profile", verifyJWT, editProfile);
usersRoutes.delete("/profile", verifyJWT, deleteProfile);

usersRoutes.post("/add-friend", verifyJWT, addFriend);
usersRoutes.post("/accept-friend", verifyJWT, acceptFriend);
// usersRoutes.post("/deny-friend", verifyJWT, denyFriend);
usersRoutes.post("/remove-friend", verifyJWT, removeFriend);
usersRoutes.get("/friends", verifyJWT, getFriends);
