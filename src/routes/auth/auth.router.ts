import { Hono } from "hono";
import { z } from "zod";
import { loginUser } from "../../controllers/auth/auth.controller";

const authRouter = new Hono();

const UserSchema = z.object({
    name: z.string().nullish().describe("Name of the user"),
    email: z.string().email().describe("Email of the user"),
    jobTitle: z.string().nullish().describe("Job title of the user"),
    phone: z.string().nullish().describe("Phone number of the user"),
})

export type IUserSchema = z.infer<typeof UserSchema> & { userId: string };

authRouter.post("/login", async (c) => {
    try {
        const payload = await c.req.json() as IUserSchema; 
        const user = await loginUser(payload);
        console.log("🚀 ~ authRouter.post ~ user:", user)
        return c.json({ message: "Login successful", user });
    } catch (error) {
        console.log("🚀 ~ authRouter.post ~ error:", error)
    }
})

export default authRouter;