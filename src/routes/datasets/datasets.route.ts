import { Hono } from "hono";
import { z } from "zod";

import { createDataset } from "../../controllers/datasets/datasets.controller";
import { CreateDatasetInDBError } from "../../exceptions/datasets.exceptions";
import { CreateDatasetError } from "../../exceptions/datasets.exceptions";

const datasetsRoute = new Hono()

const CreateDatasetSchema = z.object({
    name: z.string().min(1).max(256).describe("Name of the dataset"),
    template: z.enum(["seo", "linkedin", "instagram"]).describe("Template of the dataset"),
    description: z.string().nullish().describe("Description of the dataset"),
    userId: z.string().describe("User ID of the dataset")
})

export type ICreateDatasetSchema = z.infer<typeof CreateDatasetSchema>

datasetsRoute.post("/create", async (c) => {
    try {
        const payload = CreateDatasetSchema.parse(await c.req.json());
        const dataset = await createDataset(payload);
        return c.json({ message: "Dataset created successfully", dataset })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json({ message: "Validation error", errors: error.errors }, 400);
        }
        if(error instanceof CreateDatasetInDBError || error instanceof CreateDatasetError) {
            return c.json({ message: error.message, errorCode: error.errorCode, statusCode: error.statusCode });
        }
        return c.json({ message: "Internal server error" }, 500);
    }
})

datasetsRoute.get("/fetch/all", (c) => {
    return c.json({ message: "Get datasets" })
})

datasetsRoute.post("/fetch", (c) => {
    return c.json({ message: "Get dataset by id" })
})

datasetsRoute.post("/update/name", (c) => {
    return c.json({ message: "Update dataset name by id" })
})

datasetsRoute.post("/delete", (c) => {
    return c.json({ message: "Delete dataset by id" })
})

export default datasetsRoute
