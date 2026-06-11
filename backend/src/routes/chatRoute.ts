import express from "express";
import { protectRoute } from "../middleware/protectRoute";
import { getStreamToken } from "../controllers/chatController";

const router = express.Router();
router.get("/token", protectRoute, getStreamToken);

export default router;