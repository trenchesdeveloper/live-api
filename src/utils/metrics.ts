import express from "express";
import client from "prom-client";
import logger from "./logger";

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "REST API Response time in seconds",
  labelNames: ["method", "route", "status_code"],
});

export const databaseResponseTimeHistogram = new client.Histogram({
  name: "database_response_time_duration_seconds",
  help: "Database Response time in seconds",
  labelNames: ["operation", "success"],
});

export const startMetricsServer = () => {
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics();

  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    return res.send(await client.register.metrics());
  });

  app.listen("9100", () => {
    logger.info("Metrics server is running on port 9100");
  });
};
