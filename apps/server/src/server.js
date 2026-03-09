import app from "./app.js";
import { env } from "./config/env.js";

const port = process.env.PORT || env.port || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Environment: ${env.nodeEnv}`);
});
