/*
 * Repository for row operations
 * 
 * This module handles database operations for rows.
 */

import { eq } from "drizzle-orm";

import db from "../db";
import { ADD_ROW_TO_DATASET_IN_DB_ERROR, ADD_ROW_ITEM_TO_DATASET_IN_DB_ERROR, INSERT_BULK_ROW_ITEMS_IN_DB_ERROR, FETCH_EXISTING_ROWS_IN_DB_ERROR } from "../../constants/error.constants";
import { IAddRowItemToDatasetSchema, IAddRowToDatasetSchema } from "../../routes/rows/rows.route";
import { generateUuid } from "../../utils/generateUuid.utils";
import { rowItems, rows } from "../schema";
import { AddRowToDatasetInDBError, AddRowItemToDatasetInDBError, InsertBulkRowItemsInDBError, FetchExistingRowsInDBError } from "../../exceptions/row.exceptions";

/**
 * Adds a new row to the dataset in the database
 * 
 * @param payload - Dataset ID and row details
 * @returns Newly added row object
 * @throws AddRowToDatasetInDBError if row cannot be added
 */
export async function addRowToDatasetInDB(payload: IAddRowToDatasetSchema){
    try {
        const insertPayload = {
            rowId: `row-${generateUuid()}`,
            datasetId: payload.datasetId,
            userId: payload.userId,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await db.insert(rows).values(insertPayload);
        return insertPayload;
    } catch (error) {
        throw new AddRowToDatasetInDBError(ADD_ROW_TO_DATASET_IN_DB_ERROR.message, ADD_ROW_TO_DATASET_IN_DB_ERROR.errorCode, ADD_ROW_TO_DATASET_IN_DB_ERROR.statusCode)
    }
}

/**
 * Adds a new row item to the dataset in the database
 * 
 * @param payload - Row ID, column ID, and row item details
 * @returns Newly added row item object
 * @throws AddRowItemToDatasetInDBError if row item cannot be added
 */
export async function addRowItemToDatasetInDB(payload: IAddRowItemToDatasetSchema){
    try {
        const insertPayload = {
            rowItemId: `row-item-${generateUuid()}`,
            rowId: payload.rowId,
            columnId: payload.columnId,
            data: payload.data,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await db.insert(rowItems).values(insertPayload);
        return insertPayload;
    } catch (error) {
        throw new AddRowItemToDatasetInDBError(ADD_ROW_ITEM_TO_DATASET_IN_DB_ERROR.message, ADD_ROW_ITEM_TO_DATASET_IN_DB_ERROR.errorCode, ADD_ROW_ITEM_TO_DATASET_IN_DB_ERROR.statusCode);
    }
}

/**
 * Inserts multiple row items into the database
 * 
 * @param payload - Array of row item objects
 * @returns Array of inserted row item objects
 * @throws InsertBulkRowItemsInDBError if row items cannot be inserted
 */
export async function insertBulkRowItemsInDB(payload: {
    rowItemId: string,
    rowId: string,
    columnId: string,
    data: string,
    createdAt: Date,
    updatedAt: Date
}[]){
    try {
        await db.insert(rowItems).values(payload);
        return payload;
    } catch (error) {
        throw new InsertBulkRowItemsInDBError(INSERT_BULK_ROW_ITEMS_IN_DB_ERROR.message, INSERT_BULK_ROW_ITEMS_IN_DB_ERROR.errorCode, INSERT_BULK_ROW_ITEMS_IN_DB_ERROR.statusCode);
    }
}

/**
 * Fetches existing rows from the database
 * 
 * @param datasetId - ID of the dataset
 * @returns Array of existing rows
 * @throws FetchExistingRowsInDBError if rows cannot be fetched
 */
export async function fetchExistingRowsInDB(datasetId: string){
    try {
        return await db.select().from(rows).where(eq(rows.datasetId, datasetId));
    } catch (error) {
        throw new FetchExistingRowsInDBError(FETCH_EXISTING_ROWS_IN_DB_ERROR.message, FETCH_EXISTING_ROWS_IN_DB_ERROR.errorCode, FETCH_EXISTING_ROWS_IN_DB_ERROR.statusCode);
    }
}