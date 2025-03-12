import db from "../db";
import { IUserSchema } from "../../routes/auth/auth.router";
import { generateUuid } from "../../utils/generateUuid.utils";
import { users } from "../schema";
import { eq } from "drizzle-orm";

export async function registerUserInDb(payload: IUserSchema) {
    try {
        const insertPayload = {
            userId: generateUuid(),
            name: payload.name,
            email: payload.email,
            jobTitle: payload.jobTitle,
            phone: payload.phone,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await db.insert(users).values(insertPayload);
        return insertPayload;
    } catch (error) {
    }
}

export async function findUserByEmailInDb(email: string) {
    try {
        return await db.select().from(users).where(eq(users.email, email));
    } catch (error) {

    }
}