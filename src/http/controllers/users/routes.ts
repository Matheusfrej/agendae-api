import express from "express";
import { register } from "./register";
import { login } from "./login";

export const usersRoutes = express.Router();

usersRoutes.post("/users", register);
usersRoutes.get("/users", login);
