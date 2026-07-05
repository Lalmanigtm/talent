import { StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

interface StreamUser {
    id: string;
    name?: string;
    image?: string;
    [key: string]: any;
}

let client: StreamVideoClient | null = null;

export const initializeStreamClient = async (user: StreamUser, token: string): Promise<StreamVideoClient> => {
    // if client exists with same user instead of creating again return it

    if (client && client?.user?.id === user.id) return client;

    if (client) {
        await disconnectStreamClient();
    }

    if (!apiKey) throw new Error("Stream API key is not provided.");

    client = new StreamVideoClient({
        apiKey,
        user,
        token,
    });

    return client;
};

export const disconnectStreamClient = async (): Promise<void> => {
    if (client) {
        try {
            await client.disconnectUser();
            client = null;
        } catch (error) {
            console.error("Error disconnecting Stream client:", error);
        }
    }
};