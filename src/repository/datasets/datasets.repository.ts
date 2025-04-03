/**
 * Datasets Repository Module
 *
 * This module provides functions for interacting with dataset data in the database.
 * It handles CRUD operations for datasets and related data structures.
 */
import { eq, sql } from "drizzle-orm";

import db from "../db";
import {
  ICreateDatasetSchema,
  IDeleteDatasetSchema,
} from "../../routes/v1/datasets/datasets.route";
import { generateUuid } from "../../utils/generateUuid.utils";
import { columns, datasets, rows, rowItems, RowData } from "../schema";
import {
  CreateDatasetInDBError,
  FetchAllDatasetsFromDBError,
  FetchDatasetByIdFromDBError,
  UpdateRowCountInDatasetInDBError,
  UpdateColumnCountInDatasetInDBError,
  DeleteDatasetFromDBError,
} from "../../exceptions/datasets.exceptions";
import {
  CREATE_DATASET_IN_DB_ERROR,
  FETCH_ALL_DATASETS_FROM_DB_ERROR,
  FETCH_DATASET_BY_ID_FROM_DB_ERROR,
  UPDATE_ROW_COUNT_IN_DATASET_IN_DB_ERROR,
  UPDATE_COLUMN_COUNT_IN_DATASET_IN_DB_ERROR,
  DELETE_DATASET_FROM_DB_ERROR,
} from "../../constants/error.constants";

/**
 * Creates a new dataset in the database
 *
 * @param payload - Object containing dataset information (name, description, template, userId)
 * @returns The created dataset object with generated datasetId
 * @throws CreateDatasetInDBError if database operation fails
 */
export async function createDatasetInDB(payload: ICreateDatasetSchema) {
  try {
    // Prepare dataset object with generated UUID and timestamps
    const insertPayload = {
      datasetId: `dataset-${generateUuid()}`,
      name: payload.name,
      description: payload.description,
      template: payload.template,
      userId: payload.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // Insert the new dataset into the database
    await db.insert(datasets).values(insertPayload);
    return insertPayload;
  } catch (error) {
    throw new CreateDatasetInDBError(
      CREATE_DATASET_IN_DB_ERROR.message,
      CREATE_DATASET_IN_DB_ERROR.errorCode,
      CREATE_DATASET_IN_DB_ERROR.statusCode
    );
  }
}

/**
 * Retrieves all datasets belonging to a specific user
 *
 * @param userId - The ID of the user whose datasets to fetch
 * @returns Array of dataset objects associated with the user
 * @throws FetchAllDatasetsFromDBError if database operation fails
 */
export async function fetchAllDatasetsFromDB(userId: string) {
  try {
    return await db.select().from(datasets).where(eq(datasets.userId, userId));
  } catch (error) {
    throw new FetchAllDatasetsFromDBError(
      FETCH_ALL_DATASETS_FROM_DB_ERROR.message,
      FETCH_ALL_DATASETS_FROM_DB_ERROR.errorCode,
      FETCH_ALL_DATASETS_FROM_DB_ERROR.statusCode
    );
  }
}

/**
 * Retrieves a specific dataset by its ID along with all associated row data
 *
 * @param datasetId - The ID of the dataset to retrieve
 * @returns Array of row data objects containing column information and values
 * @throws FetchDatasetByIdFromDBError if database operation fails
 */
export async function fetchDatasetByIdFromDB(datasetId: string) {
  try {
    // First, get all row items with their column information for the dataset
    const rowItemsData = await db
      .select({
        datasetId: datasets.datasetId,
        datasetName: datasets.name,
        userId: datasets.userId,
        description: datasets.description,
        template: datasets.template,
        rowId: rows.rowId,
        columnId: columns.columnId,
        columnName: columns.name,
        columnType: columns.type,
        data: rowItems.data,
      })
      .from(datasets)
      .where(eq(datasets.datasetId, datasetId))
      .leftJoin(rows, eq(rows.datasetId, datasets.datasetId))
      .leftJoin(rowItems, eq(rowItems.rowId, rows.rowId))
      .leftJoin(columns, eq(columns.columnId, rowItems.columnId));

    // Group the data by rowId to organize row items by their parent row
    const rowsMap = new Map<string, RowData>();

    // Store each row in object and row items in array of that object
    rowItemsData.forEach((item) => {
      if (!item.rowId) return; // Skip if no rowId (shouldn't happen)

      // Create new row entry if it doesn't exist in the map
      if (!rowsMap.has(item.rowId)) {
        rowsMap.set(item.rowId, {
          rowId: item.rowId,
          datasetId: item.datasetId,
          items: [],
        });
      }

      // Add column data to the row if column exists
      if (item.columnId) {
        rowsMap.get(item.rowId)?.items.push({
          columnId: item.columnId,
          columnName: item.columnName || "",
          columnType: item.columnType || "",
          data: item.data || "",
        });
      }
    });

    // Convert map to array for the final result
    return Array.from(rowsMap.values());
  } catch (error) {
    throw new FetchDatasetByIdFromDBError(
      FETCH_DATASET_BY_ID_FROM_DB_ERROR.message,
      FETCH_DATASET_BY_ID_FROM_DB_ERROR.errorCode,
      FETCH_DATASET_BY_ID_FROM_DB_ERROR.statusCode
    );
  }
}

/**
 * Increments the row count for a specific dataset
 *
 * @param datasetId - The ID of the dataset to update
 * @returns Object indicating success status
 * @throws UpdateRowCountInDatasetInDBError if database operation fails
 */
export async function updateRowCountInDatasetInDB(datasetId: string) {
  try {
    // Use SQL expression to increment the rowsCount by 1
    await db
      .update(datasets)
      .set({
        rowsCount: sql`${datasets.rowsCount} + 1`,
        updatedAt: new Date(), // Update the timestamp
      })
      .where(eq(datasets.datasetId, datasetId));

    return { success: true };
  } catch (error) {
    throw new UpdateRowCountInDatasetInDBError(
      UPDATE_ROW_COUNT_IN_DATASET_IN_DB_ERROR.message,
      UPDATE_ROW_COUNT_IN_DATASET_IN_DB_ERROR.errorCode,
      UPDATE_ROW_COUNT_IN_DATASET_IN_DB_ERROR.statusCode
    );
  }
}

/**
 * Increments the column count for a specific dataset
 *
 * @param datasetId - The ID of the dataset to update
 * @returns Object indicating success status
 * @throws UpdateColumnCountInDatasetInDBError if database operation fails
 */
export async function updateColumnCountInDatasetInDB(datasetId: string) {
  try {
    // Use SQL expression to increment the columnsCount by 1
    await db
      .update(datasets)
      .set({
        columnsCount: sql`${datasets.columnsCount} + 1`,
        updatedAt: new Date(), // Update the timestamp
      })
      .where(eq(datasets.datasetId, datasetId));

    return { success: true };
  } catch (error) {
    throw new UpdateColumnCountInDatasetInDBError(
      UPDATE_COLUMN_COUNT_IN_DATASET_IN_DB_ERROR.message,
      UPDATE_COLUMN_COUNT_IN_DATASET_IN_DB_ERROR.errorCode,
      UPDATE_COLUMN_COUNT_IN_DATASET_IN_DB_ERROR.statusCode
    );
  }
}

export async function deleteDatasetFromDB(payload: IDeleteDatasetSchema) {
  try {
    await db.delete(datasets).where(eq(datasets.datasetId, payload.datasetId)); 
    return { success: true };
  } catch (error) {
    throw new DeleteDatasetFromDBError(DELETE_DATASET_FROM_DB_ERROR.message, DELETE_DATASET_FROM_DB_ERROR.errorCode, DELETE_DATASET_FROM_DB_ERROR.statusCode);
  }
}
