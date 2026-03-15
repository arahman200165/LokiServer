import app from "./app.js";
import { env } from "./config/env.js";
import { closePool } from "./db/pool.js";

const port = process.env.PORT || env.port || 3000;

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Environment: ${env.nodeEnv}`);
});

const shutdown = async (signal) => {
  console.log(`Received ${signal}. Shutting down...`);
  server.close(async () => {
    try {
      await closePool();
    } finally {
      process.exit(0);
    }
  });
};

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});
