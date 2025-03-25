import { Hono } from "hono";

import { authMiddleware } from "../../middleware/auth.middleware";

// Define the type for our context variables
type Variables = {
    userId: string;
};

// Create a typed Hono instance
const testRoute = new Hono<{ Variables: Variables }>();


testRoute.get("/", authMiddleware, async (c) => {
    // The userId is available from the context
    const userId = c.get("userId");
    return c.json({ message: "Get dataset by id", userId });
});

export default testRoute;
