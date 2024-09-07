import express from "express";
import validate from "../middlewares/validateResource";
import {
  createUserHandler,
  getCurrentUserHandler,
  getAllUsersHandler,
  deleteUserHandler,
  changePasswordHandler
} from "../controllers/user.controller";
import { createUserSchema } from "../schemas/user.schema";
import { requireUser } from "../middlewares/requireUser";
import { checkPermission } from "../middlewares/checkRolesPermissions";

const usersRoutes = express.Router();

usersRoutes.post("/users", requireUser, checkPermission('create', 'users'), validate(createUserSchema), createUserHandler);

usersRoutes.get("/me", requireUser, getCurrentUserHandler);
usersRoutes.get("/users", requireUser, checkPermission('read', 'users'), getAllUsersHandler);
usersRoutes.put("/users/changePassword", requireUser, checkPermission('update', 'users'), changePasswordHandler);

usersRoutes.delete("/users", requireUser, checkPermission('delete', 'users'), deleteUserHandler);
export default usersRoutes;
