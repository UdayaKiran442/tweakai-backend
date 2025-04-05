import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware } from "../../../middleware/auth.middleware";
import { trainDataset } from "../../../controllers/model/model.controller";

const modelRoute = new Hono();

const TrainDatasetSchema = z
  .object({
    datasetId: z.string().describe("Id of the dataset"),
  })
  .strict();

export type ITrainDatasetSchema = z.infer<typeof TrainDatasetSchema> & {
  userId: string;
};

modelRoute.post("/dataset/training", authMiddleware, async (c) => {
  try {
    const validation = TrainDatasetSchema.safeParse(await c.req.json());
    const userId = c.get("userId");
    if (!validation.success) {
      throw validation.error;
    }
    const payload = {
      ...validation.data,
      userId,
    };
    const response = await trainDataset(payload);
    return c.json({ message: "Dataset training in progress", response });
  } catch (error) {
    return c.json({ message: "Something went wrong", error }, 500);
  }
});

export default modelRoute;
