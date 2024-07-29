import pino from "pino";
import dayjs from "dayjs";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      customPrettifiers: {
        // The argument for this function will be the same
        // string that's at the start of the log-line by default:
        //time: `🕰 10:30`,
      },
    },
  },
});

export default logger;
