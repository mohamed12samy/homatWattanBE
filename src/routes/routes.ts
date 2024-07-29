import { Express, Request, Response } from "express";
import sessionRoutes from "./sessions.route";
import usersRoutes from "./users.route";

function routes(app: Express) {
  app.get("/health-check", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.use("/api", usersRoutes);

  app.use("/api", sessionRoutes);

}

export default routes;
