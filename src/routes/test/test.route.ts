import { Hono } from "hono";

import { authMiddleware } from "../../middleware/auth.middleware";
import { AppVariables } from "../../types/app.types";

// Create a typed Hono instance
const testRoute = new Hono<{ Variables: AppVariables }>();

testRoute.get("/", authMiddleware, async (c) => {
    // The userId is available from the context
    const userId = c.get("userId");
    return c.json({ userId });
});

export default testRoute;
