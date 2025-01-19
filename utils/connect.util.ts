import mongoose from "mongoose";
import config from "config";
import logger from "./logger.util";

async function connect() {
  const dbURI = config.get<string>("dbURI");
  try {
    logger.info("Connecting to DB !");
    await mongoose.connect(dbURI);
    //mongoose.set('debug', true);

    logger.info("Connected to DB !");
  } catch (error) {
    logger.error("Could not connect to db !");
    logger.error(error);
    process.exit(1);
  }
}

export default connect;
