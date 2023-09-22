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
import { denyFriend } from "./deny-friend";
import { block } from "./block";
import { getUserIdByEmail } from "./get-user-id-by-email";
import { unblock } from "./unblock";
import { report } from "./report";
import { changePassword } from "./change-password";
import { getBlocks } from "./get-blocks";
import { notifications } from "./notifications";

export const usersRoutes = express.Router();

usersRoutes.post("/users/login", login);

usersRoutes.post("/users/change-password", changePassword);

usersRoutes.get("/users/user-id/:email", getUserIdByEmail);

usersRoutes.post("/users", register);
usersRoutes.put("/users", verifyJWT, editProfile);
usersRoutes.delete("/users", verifyJWT, deleteProfile);
usersRoutes.get("/users/:id", verifyJWT, profile);

usersRoutes.post("/users/add/:friend_id", verifyJWT, addFriend);
usersRoutes.post("/users/accept/:friend_id", verifyJWT, acceptFriend);
usersRoutes.post("/users/deny/:friend_id", verifyJWT, denyFriend);
usersRoutes.post("/users/remove/:friend_id", verifyJWT, removeFriend);
usersRoutes.get("/friends", verifyJWT, getFriends);

usersRoutes.post("/users/block/:another_id", verifyJWT, block);
usersRoutes.post("/users/unblock/:another_id", verifyJWT, unblock);
usersRoutes.get("/blocks", verifyJWT, getBlocks);

usersRoutes.get("/notifications", verifyJWT, notifications);

usersRoutes.post("/users/report/:another_id", verifyJWT, report);
