import express from "express";
import {
  createFormHandler,
  getFormHandler,
  deleteFormHandler,
} from "../controllers/form.controller";
import { requireUser } from "../middlewares/requireUser";
import validate from "../middlewares/validateResource";
import { checkPermission } from "../middlewares/checkRolesPermissions";
const formRoutes = express.Router();

formRoutes.post(
  "/form",
  createFormHandler
);

formRoutes.get("/form", requireUser,  checkPermission('read', 'forms'), getFormHandler);

formRoutes.delete("/form", requireUser, checkPermission('delete', 'forms'), deleteFormHandler);

export default formRoutes;
