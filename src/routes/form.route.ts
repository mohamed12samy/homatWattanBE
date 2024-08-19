import express from "express";
import {
  createFormHandler,
  getFormHandler,
  deleteFormHandler,
  getNotReadyFormHandler,
  deleteNotReadyFormHandler,
  updateNotReadyFormHandler
} from "../controllers/form.controller";
import { requireUser } from "../middlewares/requireUser";
import validate from "../middlewares/validateResource";
import { checkPermission } from "../middlewares/checkRolesPermissions";
import { createFormSchema } from "../schemas/form.schema";
const formRoutes = express.Router();

formRoutes.post(
  "/form",
  createFormHandler
);

formRoutes.put("/notReadyForm", requireUser,  checkPermission('update', 'forms'), validate(createFormSchema), updateNotReadyFormHandler);

formRoutes.get("/form", requireUser,  checkPermission('read', 'forms'), getFormHandler);
formRoutes.get("/notReadyForm", requireUser,  checkPermission('read', 'forms'), getNotReadyFormHandler);

formRoutes.delete("/form", requireUser, checkPermission('delete', 'forms'), deleteFormHandler);
formRoutes.delete("/notReadyForm", requireUser, checkPermission('delete', 'forms'), deleteNotReadyFormHandler);

export default formRoutes;