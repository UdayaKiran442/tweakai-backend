import { Hono } from "hono";
import { convertDataToJSONLScript } from "../../scripts/convertDataToJSONL.script";

const testRoute = new Hono();

testRoute.get("/", async (c) => {
  const response = await convertDataToJSONLScript({
    datasetId: "dataset-5e33148d-4e2d-4ee6-bb4e-0b7bc27f010f",
    domain: "resume",
    name: "Resume SEO blogs",
    template: "seo",
    jobId: "",
    userId: "user_2unMRKbdYAHWYIIN9ROntWZpWZq",
  });
  return c.json(response);
});

export default testRoute;
