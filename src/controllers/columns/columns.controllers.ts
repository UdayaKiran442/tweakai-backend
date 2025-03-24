import { ADD_COLUMN_TO_DATASET_ERROR } from "../../constants/error.constants";
import { AddColumnToDatasetError, AddColumnToDatasetInDBError } from "../../exceptions/column.exceptions";
import { UpdateColumnCountInDatasetInDBError } from "../../exceptions/datasets.exceptions";
import { FetchExistingRowsInDBError, InsertBulkRowItemsInDBError } from "../../exceptions/row.exceptions";
import { addColumnToDatasetInDB } from "../../repository/columns/columns.repository";
import { updateColumnCountInDatasetInDB } from "../../repository/datasets/datasets.repository";
import { fetchExistingRowsInDB, insertBulkRowItemsInDB } from "../../repository/rows/rows.repository";
import { IAddColumnToDatasetSchema } from "../../routes/columns/columns.route";
import { generateUuid } from "../../utils/generateUuid.utils";

export async function addColumnToDataset(payload: IAddColumnToDatasetSchema) {
    try {
        const column = await addColumnToDatasetInDB(payload);
         // Get all existing rows for this dataset
        const existingRows = await fetchExistingRowsInDB(payload.datasetId) || [];
        
        // On every column add, Create row items with empty data for each existing row
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
        // Update column count in dataset
        await updateColumnCountInDatasetInDB(payload.datasetId);
        return column;
    } catch (error) {
        if (error instanceof AddColumnToDatasetInDBError || error instanceof InsertBulkRowItemsInDBError || error instanceof UpdateColumnCountInDatasetInDBError || error instanceof FetchExistingRowsInDBError) {
            return { message: error.message, errorCode: error.errorCode, statusCode: error.statusCode };
        }
        throw new AddColumnToDatasetError(ADD_COLUMN_TO_DATASET_ERROR.message, ADD_COLUMN_TO_DATASET_ERROR.errorCode, ADD_COLUMN_TO_DATASET_ERROR.statusCode)
    }
}