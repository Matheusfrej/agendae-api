import express from "express";
import { register } from "./register";

export const usersRoutes = express.Router();

usersRoutes.post("/users", register);
