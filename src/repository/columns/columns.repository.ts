/**
 * Columns Repository Module
 * 
 * This module provides functions for interacting with column data in the database.
 * It handles operations related to creating and managing columns within datasets.
 */
import { eq } from "drizzle-orm";

import db from "../db";
import { columns, rows, rowItems } from "../schema";
import { IAddColumnToDatasetSchema } from "../../routes/columns/columns.route";
import { generateUuid } from "../../utils/generateUuid.utils";
import { AddColumnToDatasetInDBError } from "../../exceptions/column.exceptions";
import { ADD_COLUMN_TO_DATASET_IN_DB_ERROR } from "../../constants/error.constants";

/**
 * Adds a new column to an existing dataset in the database
 * 
 * @param payload - Object containing column information (name, datasetId, type)
 * @returns The created column object with generated columnId
 * @throws AddColumnToDatasetInDBError if database operation fails
 */
export async function addColumnToDatasetInDB(payload: IAddColumnToDatasetSchema) {
    try {
        // Create the column object with generated UUID and timestamps
        const insertPayload = {
            columnId:  `column-${generateUuid()}`,
            name: payload.name,
            datasetId: payload.datasetId,
            type: payload.type,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        
        // Insert the new column into the database
        await db.insert(columns).values(insertPayload);
        
        return insertPayload;
    } catch (error) {
        throw new AddColumnToDatasetInDBError(ADD_COLUMN_TO_DATASET_IN_DB_ERROR.message, ADD_COLUMN_TO_DATASET_IN_DB_ERROR.errorCode, ADD_COLUMN_TO_DATASET_IN_DB_ERROR.statusCode)
    }
}