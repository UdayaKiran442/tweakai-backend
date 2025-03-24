import { eq, sql } from "drizzle-orm";

import db from "../db";
import { ICreateDatasetSchema } from "../../routes/datasets/datasets.route";
import { generateUuid } from "../../utils/generateUuid.utils";
import { columns, datasets, rows, rowItems, RowData } from "../schema";
import { CreateDatasetInDBError, FetchAllDatasetsFromDBError, FetchDatasetByIdFromDBError, UpdateRowCountInDatasetInDBError, UpdateColumnCountInDatasetInDBError } from "../../exceptions/datasets.exceptions";
import { CREATE_DATASET_IN_DB_ERROR, FETCH_ALL_DATASETS_FROM_DB_ERROR, FETCH_DATASET_BY_ID_FROM_DB_ERROR, UPDATE_ROW_COUNT_IN_DATASET_IN_DB_ERROR, UPDATE_COLUMN_COUNT_IN_DATASET_IN_DB_ERROR } from "../../constants/error.constants";

export async function createDatasetInDB(payload: ICreateDatasetSchema) {
    try {
        const insertPayload = {
            datasetId: `dataset-${generateUuid()}`,
            name: payload.name,
            description: payload.description,
            template: payload.template,
            userId: payload.userId,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await db.insert(datasets).values(insertPayload);
        return insertPayload;
    } catch (error) {
        throw new CreateDatasetInDBError(CREATE_DATASET_IN_DB_ERROR.message, CREATE_DATASET_IN_DB_ERROR.errorCode, CREATE_DATASET_IN_DB_ERROR.statusCode)
    }
}

export async function fetchAllDatasetsFromDB(userId: string) {
    try {
        return await db.select().from(datasets).where(eq(datasets.userId, userId));
    } catch (error) {
        throw new FetchAllDatasetsFromDBError(FETCH_ALL_DATASETS_FROM_DB_ERROR.message, FETCH_ALL_DATASETS_FROM_DB_ERROR.errorCode, FETCH_ALL_DATASETS_FROM_DB_ERROR.statusCode)
    }
}

export async function fetchDatasetByIdFromDB(datasetId: string) {
    try {
        // First, get all row items with their column information for the dataset
        const rowItemsData = await db.select({
            datasetId: datasets.datasetId,
            datasetName: datasets.name,
            userId: datasets.userId,
            description: datasets.description,
            template: datasets.template,
            rowId: rows.rowId,
            columnId: columns.columnId,
            columnName: columns.name,
            columnType: columns.type,
            data: rowItems.data
        }).from(datasets)
        .where(eq(datasets.datasetId, datasetId))
        .leftJoin(rows, eq(rows.datasetId, datasets.datasetId))
        .leftJoin(rowItems, eq(rowItems.rowId, rows.rowId))
        .leftJoin(columns, eq(columns.columnId, rowItems.columnId));

        // Group the data by rowId
        const rowsMap = new Map<string, RowData>();
        
        rowItemsData.forEach(item => {
            if (!item.rowId) return; // Skip if no rowId (shouldn't happen)
            
            if (!rowsMap.has(item.rowId)) {
                rowsMap.set(item.rowId, {
                    rowId: item.rowId,
                    datasetId: item.datasetId,
                    items: []
                });
            }
            
            if (item.columnId) {
                rowsMap.get(item.rowId)?.items.push({
                    columnId: item.columnId,
                    columnName: item.columnName || '',
                    columnType: item.columnType || '',
                    data: item.data || ''
                });
            }
        });
        
        // Convert map to array
        return Array.from(rowsMap.values());
    } catch (error) {
        throw new FetchDatasetByIdFromDBError(FETCH_DATASET_BY_ID_FROM_DB_ERROR.message, FETCH_DATASET_BY_ID_FROM_DB_ERROR.errorCode, FETCH_DATASET_BY_ID_FROM_DB_ERROR.statusCode)
    }
}

/**
 * Update the row count in a dataset
 * @param datasetId The ID of the dataset to update
 */
export async function updateRowCountInDatasetInDB(datasetId: string) {
    try {
        // Use SQL expression to increment the rowsCount
        await db.update(datasets)
            .set({
                rowsCount: sql`${datasets.rowsCount} + 1`,
                updatedAt: new Date()
            })
            .where(eq(datasets.datasetId, datasetId));
            
        return { success: true };
    } catch (error) {
        throw new UpdateRowCountInDatasetInDBError(UPDATE_ROW_COUNT_IN_DATASET_IN_DB_ERROR.message, UPDATE_ROW_COUNT_IN_DATASET_IN_DB_ERROR.errorCode, UPDATE_ROW_COUNT_IN_DATASET_IN_DB_ERROR.statusCode);
    }
}

export async function updateColumnCountInDatasetInDB(datasetId: string) {
    try {
        // Use SQL expression to increment the columnsCount
        await db.update(datasets)
            .set({
                columnsCount: sql`${datasets.columnsCount} + 1`,
                updatedAt: new Date()
            })
            .where(eq(datasets.datasetId, datasetId));
            
        return { success: true };
    } catch (error) {
        throw new UpdateColumnCountInDatasetInDBError(UPDATE_COLUMN_COUNT_IN_DATASET_IN_DB_ERROR.message, UPDATE_COLUMN_COUNT_IN_DATASET_IN_DB_ERROR.errorCode, UPDATE_COLUMN_COUNT_IN_DATASET_IN_DB_ERROR.statusCode);
    }
}