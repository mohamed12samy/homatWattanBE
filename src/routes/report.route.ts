import express from "express";
import { getAgesReport, getDegreeReport, getElectionsReport, getFieldsReport, getGenderReport, getKnewReport, getOutsiderReport, getRegisteredReport, getReligionReport, getReport, getUnionReport } from "../controllers/report.controller";
import { requireUser } from "../middlewares/requireUser";
import { checkPermission } from "../middlewares/checkRolesPermissions";

const reportRoutes = express.Router();




reportRoutes.get("/report", getReport);
reportRoutes.get("/report/registered", getRegisteredReport);
reportRoutes.get("/report/gender", getGenderReport);
reportRoutes.get("/report/religion", getReligionReport);
reportRoutes.get("/report/outsider", getOutsiderReport);
reportRoutes.get("/report/union", getUnionReport);
reportRoutes.get("/report/fields", getFieldsReport);
reportRoutes.get("/report/ages", getAgesReport);
reportRoutes.get("/report/degree", getDegreeReport);
reportRoutes.get("/report/election", getElectionsReport);
reportRoutes.get("/report/knew", getKnewReport);

export default reportRoutes;

