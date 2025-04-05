import { Hono } from "hono";

import { convertDataToJSONL } from "../../scripts/convertDataToJSONL.script";

// Create a typed Hono instance
const testRoute = new Hono();

testRoute.get("/", async (c) => {
  const message = await convertDataToJSONL();
  return c.json(message);
});

export default testRoute;
