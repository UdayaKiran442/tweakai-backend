import { IAddRowItemToDatasetSchema, IAddRowToDatasetSchema } from "../../routes/rows/rows.route";
import { addRowItemToDatasetInDB, addRowToDatasetInDB } from "../../repository/rows/rows.repository";
import { ADD_ROW_ITEM_TO_DATASET_ERROR, ADD_ROW_TO_DATASET_ERROR } from "../../constants/error.constants";
import { AddRowItemToDatasetError, AddRowItemToDatasetInDBError, AddRowToDatasetError, AddRowToDatasetInDBError } from "../../exceptions/row.exceptions";
import { updateRowCountInDatasetInDB } from "../../repository/datasets/datasets.repository";
import { UpdateRowCountInDatasetInDBError } from "../../exceptions/datasets.exceptions";

export async function addRowToDataset(payload: IAddRowToDatasetSchema){
    try {     
        const row = await addRowToDatasetInDB(payload);
        // Update row count in dataset
        await updateRowCountInDatasetInDB(payload.datasetId);
        return row;
    } catch (error) {
        if(error instanceof AddRowToDatasetInDBError || error instanceof UpdateRowCountInDatasetInDBError) {
            throw error;
        }
        throw new AddRowToDatasetError(ADD_ROW_TO_DATASET_ERROR.message, ADD_ROW_TO_DATASET_ERROR.errorCode, ADD_ROW_TO_DATASET_ERROR.statusCode)
    }
}

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