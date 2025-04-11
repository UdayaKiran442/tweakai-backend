import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware } from "../../../middleware/auth.middleware";
import {
  getFinetuningJob,
  trainDataset,
} from "../../../controllers/model/model.controller";

const modelRoute = new Hono();

const TrainDatasetSchema = z
  .object({
    datasetId: z.string().describe("Id of the dataset"),
    description: z.string().describe("Description of the dataset").optional(),
    name: z.string().describe("Name of the model"),
    template: z.string().describe("Template of the model"),
    domain: z.string().describe("Domain of the model"),
  })
  .strict();

export type ITrainDatasetSchema = z.infer<typeof TrainDatasetSchema> & {
  userId: string;
  jobId: string;
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
      jobId: "",
    };
    const response = await trainDataset(payload);
    return c.json({ message: "Dataset training in progress", response });
  } catch (error) {
    return c.json({ message: "Something went wrong", error }, 500);
  }
});

const GetFinetunedJobSchema = z
  .object({
    jobId: z.string().describe("Id of the job"),
  })
  .strict();

export type IGetFinetunedJobSchema = z.infer<typeof GetFinetunedJobSchema> & {
  userId: string;
};

modelRoute.post("/finetuned/job", authMiddleware, async (c) => {
  try {
    const validation = GetFinetunedJobSchema.safeParse(await c.req.json());
    const userId = c.get("userId");
    if (!validation.success) {
      throw validation.error;
    }
    const payload = {
      ...validation.data,
      userId,
    };
    const response = await getFinetuningJob(payload.jobId);
    return c.json({ message: "Dataset training in progress", response }, 200);
  } catch (error) {
    return c.json({ message: "Something went wrong", error }, 500);
  }
});

const GenerateResponseSchema = z
  .object({
    modelId: z.string().describe("Id of the model"),
    userInput: z.object({}).describe("Input data for the model"),
  })
  .strict();

export type IGenerateResponseSchema = z.infer<typeof GenerateResponseSchema> & {
  userId: string;
};

modelRoute.post("/generate", authMiddleware, async (c) => {
  try {
    const validation = GenerateResponseSchema.safeParse(await c.req.json());
    const userId = c.get("userId");
    if (!validation.success) {
      throw validation.error;
    }
    const payload = {
      ...validation.data,
      userId,
    };
    return c.json({ message: "Response generated" }, 200);
  } catch (error) {
    return c.json({ message: "Something went wrong", error }, 500);
  }
});

export default modelRoute;
