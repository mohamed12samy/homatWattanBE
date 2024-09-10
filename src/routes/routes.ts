import { Express, Request, Response } from "express";
import sessionRoutes from "./sessions.route";
import usersRoutes from "./users.route";
import formRoutes from "./form.route";
import { getRegisteredReport, getReport } from "../controllers/report.controller";

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
}

export default routes;
