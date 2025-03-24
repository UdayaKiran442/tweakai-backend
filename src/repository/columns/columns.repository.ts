import { eq } from "drizzle-orm";

import db from "../db";
import { columns, rows, rowItems } from "../schema";
import { IAddColumnToDatasetSchema } from "../../routes/columns/columns.route";
import { generateUuid } from "../../utils/generateUuid.utils";
import { AddColumnToDatasetInDBError } from "../../exceptions/column.exceptions";
import { ADD_COLUMN_TO_DATASET_IN_DB_ERROR } from "../../constants/error.constants";

export async function addColumnToDatasetInDB(payload: IAddColumnToDatasetSchema) {
    try {
        // Create the column
        const insertPayload = {
            columnId:  `column-${generateUuid()}`,
            name: payload.name,
            datasetId: payload.datasetId,
            type: payload.type,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        
        // Insert the new column
        await db.insert(columns).values(insertPayload);
        
        // Get all existing rows for this dataset
        const existingRows = await db.select({
            rowId: rows.rowId
        }).from(rows).where(eq(rows.datasetId, payload.datasetId));
        
        // On every column add, Create row items with empty data for each existing row
        if (existingRows.length > 0) {
            const rowItemsToInsert = existingRows.map(row => ({
                rowItemId: `rowItem-${generateUuid()}`,
                rowId: row.rowId,
                columnId: insertPayload.columnId,
                data: "", // Set data as empty string instead of null
                createdAt: new Date(),
                updatedAt: new Date()
            }));
            
            if (rowItemsToInsert.length > 0) {
                await db.insert(rowItems).values(rowItemsToInsert);
            }
        }
        
        return insertPayload;
    } catch (error) {
        throw new AddColumnToDatasetInDBError(ADD_COLUMN_TO_DATASET_IN_DB_ERROR.message, ADD_COLUMN_TO_DATASET_IN_DB_ERROR.errorCode, ADD_COLUMN_TO_DATASET_IN_DB_ERROR.statusCode)
    }
}