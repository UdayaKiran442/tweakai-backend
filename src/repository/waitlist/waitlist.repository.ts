import db from "../db";
import { AddWaitlistUserInDBError } from "../../exceptions/waitlist.exceptions";
import { ADD_WAITLIST_USER_IN_DB_ERROR } from "../../constants/error.constants";
import { IAddUserToWaitlistSchema } from "../../routes/v1/waitlist/waitist.route";
import { generateUuid } from "../../utils/generateUuid.utils";
import { waitListUsers } from "../schema";

export async function addWaitlistUserInDB(payload: IAddUserToWaitlistSchema) {
  try {
    const insertPayload = {
      waitlistUserId: `waitlist-${generateUuid()}`,
      email: payload.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await db.insert(waitListUsers).values(insertPayload);
    return insertPayload;
  } catch (error) {
    throw new AddWaitlistUserInDBError(
      ADD_WAITLIST_USER_IN_DB_ERROR.message,
      ADD_WAITLIST_USER_IN_DB_ERROR.errorCode,
      ADD_WAITLIST_USER_IN_DB_ERROR.statusCode
    );
  }
}
