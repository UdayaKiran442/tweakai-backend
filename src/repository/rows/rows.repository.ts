import db from "../db";
import { ADD_ROW_TO_DATASET_IN_DB_ERROR, ADD_ROW_ITEM_TO_DATASET_IN_DB_ERROR, INSERT_BULK_ROW_ITEMS_IN_DB_ERROR, FETCH_EXISTING_ROWS_IN_DB_ERROR } from "../../constants/error.constants";
import { IAddRowItemToDatasetSchema, IAddRowToDatasetSchema } from "../../routes/rows/rows.route";
import { generateUuid } from "../../utils/generateUuid.utils";
import { rowItems, rows } from "../schema";
import { AddRowToDatasetInDBError, AddRowItemToDatasetInDBError, InsertBulkRowItemsInDBError, FetchExistingRowsInDBError } from "../../exceptions/row.exceptions";
import { eq } from "drizzle-orm";

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

export async function fetchExistingRowsInDB(datasetId: string){
    try {
        return await db.select().from(rows).where(eq(rows.datasetId, datasetId));
    } catch (error) {
        throw new FetchExistingRowsInDBError(FETCH_EXISTING_ROWS_IN_DB_ERROR.message, FETCH_EXISTING_ROWS_IN_DB_ERROR.errorCode, FETCH_EXISTING_ROWS_IN_DB_ERROR.statusCode);
    }
}