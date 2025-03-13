import { eq } from "drizzle-orm";

import db from "../db";
import { IUserSchema } from "../../routes/auth/auth.router";
import { generateUuid } from "../../utils/generateUuid.utils";
import { users } from "../schema";
import { FindUserByEmailInDBError, RegisterUserInDBError } from "../../exceptions/auth.exceptions";
import { FIND_USER_BY_EMAIL_IN_DB_ERROR, REGISTER_USER_IN_DB_ERROR } from "../../constants/error.constants";

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
        throw new RegisterUserInDBError(REGISTER_USER_IN_DB_ERROR.message, REGISTER_USER_IN_DB_ERROR.errorCode, REGISTER_USER_IN_DB_ERROR.statusCode)
    }
}

export async function findUserByEmailInDb(email: string) {
    try {
        return await db.select().from(users).where(eq(users.email, email));
    } catch (error) {
        throw new FindUserByEmailInDBError(FIND_USER_BY_EMAIL_IN_DB_ERROR.message, FIND_USER_BY_EMAIL_IN_DB_ERROR.errorCode, FIND_USER_BY_EMAIL_IN_DB_ERROR.statusCode)
    }
}