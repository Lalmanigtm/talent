import express from "express";
import path from "path";
import fs from "fs";

import { ENV } from "./lib/env";

const app = express();

const rootDir = path.resolve();
const frontendDistPath = fs.existsSync(path.join(rootDir, "../frontend/dist"))
  ? path.join(rootDir, "../frontend/dist")
  : path.join(rootDir, "frontend/dist");

app.get("/home", (req, res) => {
  res.status(200).json({ msg: "Welcome to the home page" });
});
app.get("/Health", (req, res) => {
  res.status(200).json({ msg: "Welcome to the Health page" });
});
// Make our app ready for Deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(frontendDistPath));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

// const port = 3001;
app.listen(ENV.PORT, () =>
  console.log(`Succefully connected to db at port ${ENV.PORT}`),
);
