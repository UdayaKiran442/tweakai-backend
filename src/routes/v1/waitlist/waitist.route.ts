import { Hono } from "hono";
import { z } from "zod";
import { addWaitlistUser } from "../../../controllers/waitlist/waitlist.controller";
import {
  AddWaitlistUserError,
  AddWaitlistUserInDBError,
} from "../../../exceptions/waitlist.exceptions";

const waitListRoute = new Hono();

const AddUserToWaitlistSchema = z
  .object({
    email: z.string().describe("Email of the user"),
  })
  .strict();

export type IAddUserToWaitlistSchema = z.infer<typeof AddUserToWaitlistSchema>;

waitListRoute.post("/add", async (c) => {
  try {
    const validation = AddUserToWaitlistSchema.safeParse(await c.req.json());
    if (!validation.success) {
      return c.json(
        { message: "Validation error", errors: validation.error.errors },
        400
      );
    }
    const payload = validation.data;
    const waitlistUser = await addWaitlistUser(payload);
    return c.json({
      message: "Waitlist user added successfully",
      waitlistUser,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ message: "Validation error", errors: error.errors }, 400);
    }
    if (
      error instanceof AddWaitlistUserError ||
      error instanceof AddWaitlistUserInDBError
    ) {
      return c.json(
        {
          message: error.message,
          errorCode: error.errorCode,
          statusCode: error.statusCode,
        },
        500
      );
    }
    return c.json({ message: "Internal server error" }, 500);
  }
});

export default waitListRoute;
