import { StreamChat, UserResponse } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    throw new Error("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret); //will be used chat features.
export const streamClient = new StreamClient(apiKey, apiSecret)

// upsert means create and update
export const upsertStreamUser = async (userData: UserResponse) => {
    try {
        await chatClient.upsertUser(userData);
        console.log("Stream user upserted successfully: ", userData);
    } catch (error) {
        console.log("Error upserting Stream user: ", error);
    }
};

// delete Stream user
export const deleteStreamUser = async (userId: string) => {
    try {
        await chatClient.deleteUser(userId);
        console.log(`Stream user with ID ${userId} deleted successfully`);
    } catch (error) {
        console.log("Error deleting Stream user: ", error);
    }
};