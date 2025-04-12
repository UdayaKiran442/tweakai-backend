import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware } from "../../../middleware/auth.middleware";
import {
  generateResponse,
  getFinetuningJob,
  trainDataset,
} from "../../../controllers/model/model.controller";
import { ConvertDataToJSONLScriptError } from "../../../exceptions/script.exceptions";
import { FetchDatasetByIdError } from "../../../exceptions/datasets.exceptions";
import {
  CreateFinetuningJobError,
  RetrieveFinetuningJobFromOpenAIError,
} from "../../../exceptions/openai.exceptions";
import {
  AddModelInDbError,
  GetModelByJobIdInDbError,
  TrainDatasetError,
  UpdateModelInDbError,
} from "../../../exceptions/modal.exceptions";

const modelRoute = new Hono();

const TrainDatasetSchema = z
  .object({
    datasetId: z.string().describe("Id of the dataset"),
    description: z.string().describe("Description of the dataset").optional(),
    name: z.string().describe("Name of the model"),
    template: z.string().describe("Template of the model"),
    domain: z
      .string()
      .describe(
        "Domain of the model. Example: resume, finance, interview tips, etc."
      ),
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
    if (error instanceof z.ZodError) {
      return c.json({ message: "Invalid input", error }, 400);
    }
    if (
      error instanceof ConvertDataToJSONLScriptError ||
      error instanceof FetchDatasetByIdError ||
      error instanceof CreateFinetuningJobError ||
      error instanceof AddModelInDbError ||
      error instanceof TrainDatasetError
    ) {
      return c.json({ message: error.message, error }, 500);
    }
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
    if (error instanceof z.ZodError) {
      return c.json({ message: "Invalid input", error }, 400);
    }
    if (
      error instanceof RetrieveFinetuningJobFromOpenAIError ||
      error instanceof GetModelByJobIdInDbError ||
      error instanceof UpdateModelInDbError
    ) {
      return c.json({ message: error.message, error }, 500);
    }
    return c.json({ message: "Something went wrong", error }, 500);
  }
});

const GenerateResponseSchema = z
  .object({
    modelId: z.string().describe("Id of the model"),
    userInput: z.string().describe("Input data for the model"),
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
    const response = await generateResponse(payload);
    return c.json({ message: "Response generated", response }, 200);
  } catch (error) {
    return c.json({ message: "Something went wrong", error }, 500);
  }
});

export default modelRoute;
