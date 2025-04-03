import { Hono } from "hono";
import { z } from "zod";

import {
  createDataset,
  deleteDataset,
  fetchAllDatasets,
  fetchDatasetById,
} from "../../../controllers/datasets/datasets.controller";
import {
  CreateDatasetInDBError,
  CreateDatasetError,
  FetchAllDatasetsError,
  FetchAllDatasetsFromDBError,
  FetchDatasetByIdError,
  FetchDatasetByIdFromDBError,
  DeleteDatasetError,
  DeleteDatasetFromDBError,
} from "../../../exceptions/datasets.exceptions";
import { authMiddleware } from "../../../middleware/auth.middleware";

const datasetsRoute = new Hono();

const CreateDatasetSchema = z
  .object({
    name: z.string().min(1).max(256).describe("Name of the dataset"),
    template: z
      .enum(["seo", "linkedin", "instagram", "resume"])
      .describe("Template of the dataset"),
    description: z.string().nullish().describe("Description of the dataset"),
  })
  .strict();

export type ICreateDatasetSchema = z.infer<typeof CreateDatasetSchema> & {
  userId: string;
};

datasetsRoute.post("/create", authMiddleware, async (c) => {
  try {
    const validation = CreateDatasetSchema.safeParse(await c.req.json());
    const userId = c.get("userId");
    if (!validation.success) {
      throw validation.error;
    }
    const payload = {
      ...validation.data,
      userId,
    };
    const dataset = await createDataset(payload);
    return c.json({ message: "Dataset created successfully", dataset });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ message: "Validation error", errors: error.errors }, 400);
    }
    if (
      error instanceof CreateDatasetInDBError ||
      error instanceof CreateDatasetError
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

datasetsRoute.get("/fetch/all", authMiddleware, async (c) => {
  try {
    const userId = c.get("userId");
    const datasets = await fetchAllDatasets(userId);
    return c.json({ message: "Get datasets", datasets });
  } catch (error) {
    if (
      error instanceof FetchAllDatasetsError ||
      error instanceof FetchAllDatasetsFromDBError
    ) {
      return c.json({
        message: error.message,
        errorCode: error.errorCode,
        statusCode: error.statusCode,
      });
    }
    return c.json({ message: "Internal server error" }, 500);
  }
});

const FetchDatasetByIdSchema = z
  .object({
    datasetId: z.string().describe("Id of the dataset"),
  })
  .strict();

export type IFetchDatasetByIdSchema = z.infer<typeof FetchDatasetByIdSchema> & {
  userId: string;
};

datasetsRoute.post("/fetch", authMiddleware, async (c) => {
  try {
    const validation = FetchDatasetByIdSchema.safeParse(await c.req.json());
    const userId = c.get("userId");
    if (!validation.success) {
      throw validation.error;
    }
    const payload = {
      ...validation.data,
      userId,
    };
    const dataset = await fetchDatasetById(payload);
    return c.json({ message: "Get dataset by id", dataset });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ message: "Validation error", errors: error.errors }, 400);
    }
    if (
      error instanceof FetchDatasetByIdError ||
      error instanceof FetchDatasetByIdFromDBError
    ) {
      return c.json({
        message: error.message,
        errorCode: error.errorCode,
        statusCode: error.statusCode,
      });
    }
    return c.json({ message: "Internal server error" }, 500);
  }
});

datasetsRoute.post("/update/name", (c) => {
  return c.json({ message: "Update dataset name by id" });
});

const DeleteDatasetSchema = z
  .object({
    datasetId: z.string().describe("Id of the dataset"),
  })
  .strict();

export type IDeleteDatasetSchema = z.infer<typeof DeleteDatasetSchema> & {
  userId: string;
};

datasetsRoute.post("/delete", authMiddleware, async (c) => {
  try {
    const validation = DeleteDatasetSchema.safeParse(await c.req.json());
    const userId = c.get("userId");
    if (!validation.success) {
      throw validation.error;
    }
    const payload = {
      ...validation.data,
      userId,
    };
    const dataset = await deleteDataset(payload);
    return c.json({ message: "Delete deleted successfully", dataset }, 200);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ message: "Validation error", errors: error.errors }, 400);
    }
    if (
      error instanceof DeleteDatasetError ||
      error instanceof DeleteDatasetFromDBError
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

export default datasetsRoute;
