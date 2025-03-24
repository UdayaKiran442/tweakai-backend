import { Hono } from "hono"
import { z } from "zod"

import { addColumnToDataset } from "../../../controllers/columns/columns.controllers"
import { AddColumnToDatasetError, AddColumnToDatasetInDBError } from "../../../exceptions/column.exceptions"
import { FetchExistingRowsInDBError, InsertBulkRowItemsInDBError } from "../../../exceptions/row.exceptions"
import { UpdateColumnCountInDatasetInDBError } from "../../../exceptions/datasets.exceptions"

const columnsRoute = new Hono()

const AddColumnToDatasetSchema = z.object({
    datasetId: z.string().describe("Dataset ID of the column to be added"),
    name: z.string().min(1).max(256).describe("Name of the column"),
    type: z.enum(["input", "output"]).describe("Type of the column"),
}).strict()

export type IAddColumnToDatasetSchema = z.infer<typeof AddColumnToDatasetSchema> & { userId: string }

columnsRoute.post("/add", async (c) => {
    try {
        const validation = AddColumnToDatasetSchema.safeParse(await c.req.json());
        if(!validation.success) {
            throw validation.error
        }
        const payload = {
            ...validation.data,
            userId: "user-08b2d8d7-df38-4982-b5ed-5bc6f147e8da"
        }
        const column = await addColumnToDataset(payload);
        return c.json({ message: "Column added to dataset successfully", column });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json({ message: "Validation error", errors: error.errors }, 400);
        }
        if (error instanceof AddColumnToDatasetError || error instanceof AddColumnToDatasetInDBError || error instanceof InsertBulkRowItemsInDBError || error instanceof UpdateColumnCountInDatasetInDBError || error instanceof FetchExistingRowsInDBError) {
            return c.json({ message: error.message, errorCode: error.errorCode, statusCode: error.statusCode });
        }
        return c.json({ message: "Internal server error" }, 500);
    }
})

columnsRoute.post("/delete", (c) => {
    return c.json({ message: "Delete column from dataset" })
})

columnsRoute.post("/update", (c) => {
    return c.json({ message: "Update column in dataset" })
})

export default columnsRoute