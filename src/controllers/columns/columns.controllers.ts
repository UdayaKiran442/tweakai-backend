/*
 * Controller for column operations
 * 
 * This module handles column operations, and business logic related to columns.
 */


import { ADD_COLUMN_TO_DATASET_ERROR } from "../../constants/error.constants";
import { AddColumnToDatasetError, AddColumnToDatasetInDBError } from "../../exceptions/column.exceptions";
import { UpdateColumnCountInDatasetInDBError } from "../../exceptions/datasets.exceptions";
import { FetchExistingRowsInDBError, InsertBulkRowItemsInDBError } from "../../exceptions/row.exceptions";
import { addColumnToDatasetInDB } from "../../repository/columns/columns.repository";
import { updateColumnCountInDatasetInDB } from "../../repository/datasets/datasets.repository";
import { fetchExistingRowsInDB, insertBulkRowItemsInDB } from "../../repository/rows/rows.repository";
import { IAddColumnToDatasetSchema } from "../../routes/columns/columns.route";
import { generateUuid } from "../../utils/generateUuid.utils";


/**
 * Controller for adding a new column to a dataset
 * 
 * @param payload - Dataset ID and column details
 * @returns Newly added column object
 * @throws AddColumnToDatasetError if column cannot be added, throws respective db errors if database operation fails
 */
export async function addColumnToDataset(payload: IAddColumnToDatasetSchema) {
    try {
        const column = await addColumnToDatasetInDB(payload);
         // Get all existing rows for this dataset
        const existingRows = await fetchExistingRowsInDB(payload.datasetId) || [];
        
        // On every column add, Create row items with empty data for each existing row
        /** Why this logic?
         * While adding a new column there is a chance that some rows are added before the column is added.
         * So, for each existing row, create a row item with empty data for the new column.
         * Hence there will be consistent data structure for all rows and easy for data validation before processing and training.
         * With this we can handle empty row items (row items with no data) easily and warn user if they are training dataset with empty row items.
         */
        if (existingRows.length > 0) {
            const rowItemsToInsert = existingRows.map(row => ({
                rowItemId: `rowItem-${generateUuid()}`,
                rowId: row.rowId,
                columnId: column.columnId,
                data: "", // Set data as empty string instead of null
                createdAt: new Date(),
                updatedAt: new Date()
            }));
            
            if (rowItemsToInsert.length > 0) {
                await insertBulkRowItemsInDB(rowItemsToInsert);
            }
        }
        // increment column count in dataset
        await updateColumnCountInDatasetInDB(payload.datasetId);
        return column;
    } catch (error) {
        if (error instanceof AddColumnToDatasetInDBError || error instanceof InsertBulkRowItemsInDBError || error instanceof UpdateColumnCountInDatasetInDBError || error instanceof FetchExistingRowsInDBError) {
            throw error
        }
        throw new AddColumnToDatasetError(ADD_COLUMN_TO_DATASET_ERROR.message, ADD_COLUMN_TO_DATASET_ERROR.errorCode, ADD_COLUMN_TO_DATASET_ERROR.statusCode)
    }
}