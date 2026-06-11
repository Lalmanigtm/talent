import express, { Request, Response } from "express";
import path from "path";
import cors from "cors"
import { serve } from "inngest/express"
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env";
import { connectDB } from "./lib/db";
import { functions, inngest } from "./lib/inngest";
import { protectRoute } from "./middleware/protectRoute";
import chatRoutes from "./routes/chatRoute"


const app = express();

// middleware
app.use(express.json())
// credentials: true meaning ?? => server allows a browser to include cookies on request
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }))

// adding clerk Middleware
app.use(clerkMiddleware()) //this adds auth field to request object: req.auth()

app.use("/api/inngest", serve({ client: inngest, functions }))
app.use("/api/chat", chatRoutes)

app.get("/health", (req: Request, res: Response) => {
  // req.auth
  res.status(200).json({ message: "Welcome to the Health page" });
});

// when you pass an array of middleware to Express, it automatically flattens and executes them sequentially , one by one.
app.get("/video-calls", protectRoute, (req: Request, res: Response) => {
  res.status(200).json({ message: "this is the videocall endpoint" });
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

const startServer = async () => {
  try {
    await connectDB()
    app.listen(ENV.PORT, () => console.log("Successfully connected to db at port:", ENV.PORT))
  } catch (error) {
    console.error("Error starting the server", error)
  }
}

startServer()