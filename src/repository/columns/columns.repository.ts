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
        
        return insertPayload;
    } catch (error) {
        throw new AddColumnToDatasetInDBError(ADD_COLUMN_TO_DATASET_IN_DB_ERROR.message, ADD_COLUMN_TO_DATASET_IN_DB_ERROR.errorCode, ADD_COLUMN_TO_DATASET_IN_DB_ERROR.statusCode)
    }
}