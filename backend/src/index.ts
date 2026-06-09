import express from "express";
import { ENV } from "./lib/env";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ msg: "success from API" });
});

app.get("/home", (req, res) => {
  res.status(200).json({ msg: "Welcome to the home page" });
});

// const port = 3001;
app.listen(ENV.PORT, () => console.log("Succefully connected to db"));
