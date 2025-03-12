import { findUserByEmailInDb, registerUserInDb } from "../../repository/auth/auth.repository";
import { IUserSchema } from "../../routes/auth/auth.router";

export async function loginUser(payload: IUserSchema) {
    try {
        // check if user exists, find user by email
        const user = await findUserByEmailInDb(payload.email);
        // if user exists, return user
        if (user && user?.length > 0) {
            return user;
        }
        // else register user and save to db, return new registered user
        return await registerUserInDb(payload);
    } catch (error) {
        
    }
}