import { Inngest, InngestFunction } from "inngest";
import { connectDB } from "./db";
import User from "../models/User"
import { deleteStreamUser, upsertStreamUser } from "./stream";

export const inngest = new Inngest({ id: "talent-iq" });

// for create user in inngest
const syncUser = inngest.createFunction(
    { id: "sync-user", triggers: [{ event: "clerk/user.created" }] },
    async ({ event }) => {
        await connectDB()
        console.log("✅ DB connected");

        const { id, email_addresses, first_name, last_name, image_url } = event.data

        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            profileImage: image_url
        }

        // await User.create(newUser)
        console.log("📝 Creating user:", newUser);


        try {
            const user = await User.create(newUser);
            console.log("✅ User created:", user);
            return { success: true, userId: user._id };
        } catch (err) {
            console.error("❌ Failed to create user:", err);
            throw err; // Re-throw so Inngest shows the error
        }
        // todo sth else later

        await upsertStreamUser({
            id: newUser.clerkId.toString(),
            name: newUser.name,
            image: newUser.profileImage
        })
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

        await deleteStreamUser(id.toString())
    }
)

export const functions: InngestFunction.Any[] = [syncUser, deleteUserFromDB]