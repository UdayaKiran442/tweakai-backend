import { IAddRowItemToDatasetSchema, IAddRowToDatasetSchema } from "../../routes/v1/rows/rows.route";
import { addRowItemToDatasetInDB, addRowToDatasetInDB } from "../../repository/rows/rows.repository";
import { ADD_ROW_ITEM_TO_DATASET_ERROR, ADD_ROW_TO_DATASET_ERROR } from "../../constants/error.constants";
import { AddRowItemToDatasetError, AddRowItemToDatasetInDBError, AddRowToDatasetError, AddRowToDatasetInDBError } from "../../exceptions/row.exceptions";
import { updateRowCountInDatasetInDB } from "../../repository/datasets/datasets.repository";
import { UpdateRowCountInDatasetInDBError } from "../../exceptions/datasets.exceptions";

/**
 * Controller for adding a new row to a dataset
 * 
 * @param payload - Dataset ID and row details
 * @returns Newly added row object
 * @throws AddRowToDatasetError if row cannot be added, throws respective db errors if database operation fails
 */

export async function addRowToDataset(payload: IAddRowToDatasetSchema){
    try {     
        const row = await addRowToDatasetInDB(payload);
        // increment row count in dataset after successfully adding row
        await updateRowCountInDatasetInDB(payload.datasetId);
        return row;
    } catch (error) {
        if(error instanceof AddRowToDatasetInDBError || error instanceof UpdateRowCountInDatasetInDBError) {
            throw error;
        }
        throw new AddRowToDatasetError(ADD_ROW_TO_DATASET_ERROR.message, ADD_ROW_TO_DATASET_ERROR.errorCode, ADD_ROW_TO_DATASET_ERROR.statusCode)
    }
}

/**
 * Controller for adding a new row item to a dataset
 * 
 * @param payload - Dataset ID and row item details
 * @returns Newly added row item object
 * @throws AddRowItemToDatasetError if row item cannot be added, throws respective db errors if database operation fails
 */
export async function addRowItemToDataset(payload: IAddRowItemToDatasetSchema){
    try {
        return await addRowItemToDatasetInDB(payload);
    } catch (error) {
       if(error instanceof AddRowItemToDatasetInDBError) {
           throw error;
       }
       throw new AddRowItemToDatasetError(ADD_ROW_ITEM_TO_DATASET_ERROR.message, ADD_ROW_ITEM_TO_DATASET_ERROR.errorCode, ADD_ROW_ITEM_TO_DATASET_ERROR.statusCode)
    }
}