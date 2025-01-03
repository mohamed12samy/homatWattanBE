import express from "express";
import {
  createFormHandler,
  getFormHandler,
  deleteFormHandler,
  getNotReadyFormHandler,
  deleteNotReadyFormHandler,
  updateNotReadyFormHandler,
  approveFormHandler,
  getNotFilledRequiredFieldsPercentageHandler, getRegisteredMembersHandler,
  getFormsCountHandler,
  checkIdExistenceHandler,
  renewMemberHandler,
  downloadFormsAsExcelHandler,
  getMembersCardsHandler,
  picsMemberHandler
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
formRoutes.put("/form", requireUser,  checkPermission('update', 'forms'), approveFormHandler);
formRoutes.put("/form/renew", requireUser,  checkPermission('update', 'forms'), renewMemberHandler);
formRoutes.put("/form/pics", requireUser,  checkPermission('update', 'forms'), picsMemberHandler);

formRoutes.get("/form", requireUser,  checkPermission('read', 'forms'), getFormHandler);
formRoutes.get("/form/registered", requireUser,  checkPermission('read', 'forms'), getRegisteredMembersHandler);
formRoutes.get("/notReadyForm", requireUser,  checkPermission('read', 'forms'), getNotReadyFormHandler);
formRoutes.get("/notReadyForm/percent", requireUser,  checkPermission('read', 'forms'), getNotFilledRequiredFieldsPercentageHandler);
formRoutes.get("/forms/count", requireUser,  checkPermission('read', 'forms'), getFormsCountHandler);
formRoutes.get("/form/id/check", checkIdExistenceHandler);
formRoutes.get("/form/download",  requireUser,  checkPermission('read', 'forms'), downloadFormsAsExcelHandler);
formRoutes.get("/form/card/download",  requireUser,  checkPermission('read', 'forms'), getMembersCardsHandler);

formRoutes.delete("/form", requireUser, checkPermission('delete', 'forms'), deleteFormHandler);
formRoutes.delete("/notReadyForm", requireUser, checkPermission('delete', 'forms'), deleteNotReadyFormHandler);

export default formRoutes;
