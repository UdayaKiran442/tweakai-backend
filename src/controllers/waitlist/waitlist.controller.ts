import { ADD_WAITLIST_USER_ERROR } from "../../constants/error.constants";
import { AddWaitlistUserError } from "../../exceptions/waitlist.exceptions";
import { addWaitlistUserInDB } from "../../repository/waitlist/waitlist.repository";
import { IAddUserToWaitlistSchema } from "../../routes/v1/waitlist/waitist.route";

export async function addWaitlistUser(payload: IAddUserToWaitlistSchema) {
  try {
    return await addWaitlistUserInDB(payload);
  } catch (error) {
    throw new AddWaitlistUserError(
      ADD_WAITLIST_USER_ERROR.message,
      ADD_WAITLIST_USER_ERROR.errorCode,
      ADD_WAITLIST_USER_ERROR.statusCode
    );
  }
}
