import { chatClient } from "../lib/stream";
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/protectRoute";

export async function getStreamToken(req: AuthenticatedRequest, res: Response) {
    try {
        // use clerkId for stream (not mongodb _id) ==> it should match the id we have in the getStream.io dashboard.

        const token = chatClient.createToken(req.user.clerkId);

        res.status(200).json({
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.image,
        })
    } catch (error) {
        console.log("Error in getStream Token:", (error as Error).message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}