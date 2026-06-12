
import express from "express"
import { protectRoute } from "../middleware/protectRoute"
import { createSession, endSession, getActiveSession, getMyRecentSession, getSessionById, joinSession } from "../controllers/sessionController"

const router = express.Router()


router.post("/", protectRoute, createSession)
router.get("/active", protectRoute, getActiveSession)
router.get("/my-recent", protectRoute, getMyRecentSession)

router.get("/:id", protectRoute, getSessionById) // /api/sessions/12344546
router.get("/:id/join", protectRoute, joinSession)
router.get("/:id/end", protectRoute, endSession)

export default router