import express from "express";
import config from "config";
import connect from "../utils/connect.util";
import logger from "../utils/logger.util";
import routes from "./routes/routes";
import { deserializeUser } from "./middlewares/deserializeUser";
import seedData from "../utils/seeder.util";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import { renewJobSchedule } from "../utils/renewJobSchedule";

const port = config.get<number>("port");

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
  cors({
    origin: "membersofhumatalwatan.com",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token', 'Access-Control-Allow-Headers']
  })
);

app.use((req, res, next) => {
  const allowedOrigins :string[] = ['membersofhumatalwatan.com'];
  const origin : string | undefined = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', "true");
  return next();
});

app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`App is Running! on Port ${port}`);
  await connect();
  await seedData();
  await renewJobSchedule();
  routes(app);
});
