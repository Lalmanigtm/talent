import { Inngest, InngestFunction } from "inngest";
import { connectDB } from "./db";
import User from "../models/User"

export const inngest = new Inngest({ id: "talent-iq" });

// for create user in inngest
const syncUser = inngest.createFunction(
    { id: "sync-user", triggers: [{ event: "clerk/user.created" }] },
    async ({ event }) => {
        await connectDB()

        const { id, email_address, first_name, last_name, image_url } = event.data

        const newUser = {
            clerkId: id,
            email: email_address[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            profileImage: image_url
        }

        await User.create(newUser)

        // todo sth else later
    }
)

// for deleate user in inngest
const deleteUserFromDB = inngest.createFunction(
    { id: "delete-user-from-db", triggers: [{ event: "clerk/user.deleted" }] },
    async ({ event }) => {
        await connectDB();

        const { id } = event.data;
        await User.deleteOne({ clerkId: id });

        // todo sth else later
    }
)

export const functions: InngestFunction.Any[] = [syncUser, deleteUserFromDB]