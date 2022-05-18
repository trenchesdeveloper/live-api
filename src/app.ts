import { restResponseTimeHistogram, startMetricsServer } from "./utils/metrics";
import responseTime from "response-time";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import createServer from "./utils/server";
import { Request, Response } from "express";

const port = config.get<number>("port");

const app = createServer();

// app.use(
//   responseTime((req: Request, res: Response, time: number) => {
//     if (req?.route?.path) {
//       restResponseTimeHistogram.observe(
//         {
//           method: req.method,
//           route: req.route.path,
//           status_code: res.statusCode,
//         },
//         time * 1000
//       );
//     }
//   })
// );

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  // start metrics server
  startMetricsServer();
  await connect();
});
