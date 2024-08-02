import express from "express";
import config from "config";
import connect from "../utils/connect.util";
import logger from "../utils/logger.util";
import routes from "./routes/routes";
import { deserializeUser } from "./middlewares/deserializeUser";
import seedData from "../utils/seeder.util";
import cors from "cors";

const port = config.get<number>("port");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token', 'Access-Control-Allow-Headers']
  })
);
app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`App is Running! on Port ${port}`);
  await connect();
  await seedData();
  routes(app);
});
