import express from "express";
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionsHandler,
} from "../controllers/session.controller";
import { createSessionSchema } from "../schemas/session.schema";
import { requireUser } from "../middlewares/requireUser";
import validate from "../middlewares/validateResource";
const sessionRoutes = express.Router();

sessionRoutes.post(
  "/sessions",
  validate(createSessionSchema),
  createUserSessionHandler
);

sessionRoutes.get("/sessions", requireUser, getUserSessionsHandler);

sessionRoutes.delete("/sessions", requireUser, deleteUserSessionHandler);

export default sessionRoutes;
