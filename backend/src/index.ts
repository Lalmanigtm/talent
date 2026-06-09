import express from "express";
import path from "path";

import { ENV } from "./lib/env";

const app = express();


app.get("/home", (req, res) => {
  res.status(200).json({ msg: "Welcome to the home page" });
});

app.get("/Health", (req, res) => {
  res.status(200).json({ msg: "Welcome to the Health page" });
});

// Make our app ready for Deployment
if (ENV.NODE_ENV === "production") {
  // Go up two levels from backend/src to reach the root, then into frontend/dist
  const frontendDistPath = path.join(__dirname, "../../frontend/dist");

  app.use(express.static(frontendDistPath));

  // In Express 5, use a Regex literal to catch all remaining frontend routes
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

app.listen(ENV.PORT, () =>
  console.log(`Successfully connected to db at port ${ENV.PORT}`),
);