import { Express, Request, Response } from "express";
import sessionRoutes from "./sessions.route";
import usersRoutes from "./users.route";
import formRoutes from "./form.route";
import { getAgesReport, getDegreeReport, getFieldsReport, getGenderReport, getOutsiderReport, getRegisteredReport, getReligionReport, getReport, getUnionReport } from "../controllers/report.controller";

function routes(app: Express) {
  /**
   * @swagger
   * /health-check:
   *   get:
   *     summary: Health check endpoint
   *     responses:
   *       200:
   *         description: OK
   */
  app.get("/health-check", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.use("/api", usersRoutes);
  app.use("/api", sessionRoutes);
  app.use("/api", formRoutes);

  /**
   * @swagger
   * /api/report:
   *   get:
   *     summary: Get report data
   *     responses:
   *       200:
   *         description: Report data
   */
  app.get("/api/report", getReport);
  app.get("/api/report/registered", getRegisteredReport);
  app.get("/api/report/gender", getGenderReport);
  app.get("/api/report/religion", getReligionReport);
  app.get("/api/report/outsider", getOutsiderReport);
  app.get("/api/report/union", getUnionReport);
  app.get("/api/report/fields", getFieldsReport);
  app.get("/api/report/ages", getAgesReport);
  app.get("/api/report/degree", getDegreeReport);
}

export default routes;
