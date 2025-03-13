import { Hono } from "hono";
import { z } from "zod";
import { loginUser } from "../../controllers/auth/auth.controller";
import { FindUserByEmailInDBError, LoginUserError, RegisterUserInDBError } from "../../exceptions/auth.exceptions";

const authRouter = new Hono();

const UserSchema = z.object({
    name: z.string().nullish().describe("Name of the user"),
    email: z.string().email().describe("Email of the user"),
    jobTitle: z.string().nullish().describe("Job title of the user"),
    phone: z.string().nullish().describe("Phone number of the user"),
})

export type IUserSchema = z.infer<typeof UserSchema> & { userId?: string };

authRouter.post("/login", async (c) => {
    try { 
        const payload = UserSchema.parse(await c.req.json()); // Validate payload
        const user = await loginUser(payload);
        return c.json({ message: "Login successful", user });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json({ message: "Validation error", errors: error.errors }, 400);
        }
        if (error instanceof LoginUserError || error instanceof RegisterUserInDBError || error instanceof FindUserByEmailInDBError) {
            return c.json({ message: error.message, errorCode: error.errorCode, statusCode: error.statusCode });
        }
        return c.json({ message: "Internal server error" }, 500);
    }
})

export default authRouter;