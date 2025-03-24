import { Hono } from "hono"
import { z } from "zod"

import { addRowItemToDataset, addRowToDataset } from "../../controllers/rows/rows.controller"
import { AddRowToDatasetError, AddRowToDatasetInDBError, AddRowItemToDatasetError, AddRowItemToDatasetInDBError } from "../../exceptions/row.exceptions"
import { UpdateRowCountInDatasetInDBError } from "../../exceptions/datasets.exceptions"

const rowsRoute = new Hono()

const AddRowToDatasetSchema = z.object({
    datasetId: z.string().describe("Dataset ID of the row"),
}).strict()

export type IAddRowToDatasetSchema = z.infer<typeof AddRowToDatasetSchema> & { userId: string }

rowsRoute.post("/add", async (c) => {
    try {
        const validation = AddRowToDatasetSchema.safeParse(await c.req.json())
        if (!validation.success) {
            throw validation.error;
        }
        const payload = {
            ...validation.data,
            userId: "user-08b2d8d7-df38-4982-b5ed-5bc6f147e8da"
        }
        const row = await addRowToDataset(payload)
        return c.json({ message: "Row added to dataset successfully", row })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json({ message: "Validation error", errors: error.errors }, 400);
        }
        if (error instanceof AddRowToDatasetError || error instanceof AddRowToDatasetInDBError || error instanceof UpdateRowCountInDatasetInDBError) {
            return c.json({ message: error.message, errorCode: error.errorCode, statusCode: error.statusCode });
        }
        return c.json({ message: "Internal server error" }, 500);
    }
})

const AddRowItemToDatasetSchema = z.object({
    rowId: z.string().describe("Row ID of the row"),
    columnId: z.string().describe("Column ID of the row"),
    data: z.string().describe("Data of the row"),
}).strict()

export type IAddRowItemToDatasetSchema = z.infer<typeof AddRowItemToDatasetSchema> & { userId: string }

rowsRoute.post("/add/data", async (c) => {
    try {
        const validation = AddRowItemToDatasetSchema.safeParse(await c.req.json())
        if (!validation.success) {
            throw validation.error;
        }
        const payload = {
            ...validation.data,
            userId: "user-08b2d8d7-df38-4982-b5ed-5bc6f147e8da"
        }
        const row = await addRowItemToDataset(payload);
        return c.json({ message: "Row added to dataset successfully", row })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json({ message: "Validation error", errors: error.errors }, 400);
        }
        if (error instanceof AddRowItemToDatasetError || error instanceof AddRowItemToDatasetInDBError) {
            return c.json({ message: error.message, errorCode: error.errorCode, statusCode: error.statusCode });
        }
        return c.json({ message: "Internal server error" }, 500);
    }
})

rowsRoute.post("/delete", (c) => {
    return c.json({ message: "Delete row" })
})

export default rowsRoute