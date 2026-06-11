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

        // Step 1: Save to MongoDB
        let user;
        try {
            user = await User.create(newUser);
            console.log("✅ User created in MongoDB:", user);
        } catch (err) {
            console.error("❌ Failed to create user in MongoDB:", err);
            throw err;
        }

        // todo sth else later // Step 2: Upsert to GetStream — now actually reachable
        try {
            await upsertStreamUser({
                id: newUser.clerkId.toString(),
                name: newUser.name,
                image: newUser.profileImage,
            });
        } catch (err) {
            console.error("❌ Failed to upsert Stream user:", err);
            throw err;
        }
        return { success: true, userId: user._id };
    }
)

// for deleate user in inngest
const deleteUserFromDB = inngest.createFunction(
    { id: "delete-user-from-db", triggers: [{ event: "clerk/user.deleted" }] },
    async ({ event }) => {
        await connectDB();

        const { id } = event.data;

        // Step 1: Delete from MongoDB
        await User.deleteOne({ clerkId: id });
        console.log("✅ User deleted from MongoDB");

        // todo sth else later :// Step 2: Delete from GetStream
        await deleteStreamUser(id.toString())
        console.log("✅ Stream user deleted");
    }
)

export const functions: InngestFunction.Any[] = [syncUser, deleteUserFromDB]