import express from "express";
import path from "path";

import { ENV } from "./lib/env";

const app = express();

const __dirname = path.resolve();

app.get("/home", (req, res) => {
  res.status(200).json({ msg: "Welcome to the home page" });
});
app.get("/health", (req, res) => {
  res.status(200).json({ msg: "Welcome to the Health page" });
});
// Make our app ready for Deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
  });
}

// const port = 3001;
app.listen(ENV.PORT, () =>
  console.log(`Succefully connected to db at port ${ENV.PORT}`),
);
