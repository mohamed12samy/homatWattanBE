import express from "express";
import {
  getAgesReport,
  getDegreeReport,
  getElectionsReport,
  getFieldsReport,
  getGenderReport,
  getKnewReport,
  getOutsiderReport,
  getRegisteredReport,
  getReligionReport,
  getReport,
  getUnionReport,
  getWeeklyReport
} from "../controllers/report.controller";
import { requireUser } from "../middlewares/requireUser";
import { checkPermission } from "../middlewares/checkRolesPermissions";
import { setQuery } from "../middlewares/querySetup";

const reportRoutes = express.Router();

reportRoutes.get("/report", getReport);

reportRoutes.get("/report/registered",  setQuery(), getRegisteredReport);
// reportRoutes.get("/report/registered/data",  setQuery(), getRegisteredReportData);

reportRoutes.get("/report/gender",  setQuery(), getGenderReport);
// reportRoutes.get("/report/gender/data",  setQuery(), getGenderReportData);

reportRoutes.get("/report/religion",  setQuery(), getReligionReport);
// reportRoutes.get("/report/religion/data",  setQuery(), getReligionReportData);

reportRoutes.get("/report/outsider",  setQuery(), getOutsiderReport);
// reportRoutes.get("/report/outsider/data",  setQuery(), getOutsiderReportData);

reportRoutes.get("/report/union",  setQuery(), getUnionReport);
// reportRoutes.get("/report/union/data",  setQuery(), getUnionReportData);

reportRoutes.get("/report/fields",  setQuery(), getFieldsReport);
// reportRoutes.get("/report/fields/data",  setQuery(), getFieldsReportData);

reportRoutes.get("/report/ages",  setQuery(), getAgesReport);
// reportRoutes.get("/report/ages/data",  setQuery(), getAgesReportData);

reportRoutes.get("/report/degree",  setQuery(), getDegreeReport);
// reportRoutes.get("/report/degree/data",  setQuery(), getDegreeReportData);

reportRoutes.get("/report/election",  setQuery(), getElectionsReport);
// reportRoutes.get("/report/election/data",  setQuery(), getElectionsReportData);

reportRoutes.get("/report/knew",  setQuery(), getKnewReport);
// reportRoutes.get("/report/knew/data",  setQuery(), getKnewReportData);

reportRoutes.get("/report/weeklyReport", setQuery(), getWeeklyReport);
// reportRoutes.get("/report/weeklyReport/data", setQuery(), getWeeklyReportData);

export default reportRoutes;

