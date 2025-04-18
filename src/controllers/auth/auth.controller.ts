/**
 * Controller for user authentication
 * 
 * This module handles user authentication operations, including user login and registration.
 */

import { findUserByEmailInDb, findUserByIdInDb, registerUserInDb } from "../../repository/auth/auth.repository";
import { IUserSchema } from "../../routes/v1/auth/auth.router";
import { FindUserByEmailInDBError, FindUserByIdInDBError, LoginUserError, RegisterUserInDBError } from "../../exceptions/auth.exceptions";
import { LOGIN_USER_ERROR } from "../../constants/error.constants";

/**
 * Logs in a user by their id
 * 
 * @param payload - User credentials containing id
 * @returns User object if found, or newly registered user object
 * @throws LoginUserError if user does not exist or database operation fails
 */
export async function loginUser(payload: IUserSchema) {
    try {
        // check if user exists, find user by id
        const user = await findUserByIdInDb(payload.userId);
        // if user exists, return user
        if (user && user?.length > 0) {
            return user;
        }
        // else register user and save to db, return new registered user
        return await registerUserInDb(payload);
    } catch (error) {
        if(error instanceof FindUserByIdInDBError || error instanceof RegisterUserInDBError) {
            throw error;
        }
        throw new LoginUserError(LOGIN_USER_ERROR.message, LOGIN_USER_ERROR.errorCode, LOGIN_USER_ERROR.statusCode)
    }
}