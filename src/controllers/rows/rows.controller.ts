import { IAddRowItemToDatasetSchema, IAddRowToDatasetSchema } from "../../routes/rows/rows.route";
import { addRowItemToDatasetInDB, addRowToDatasetInDB } from "../../repository/rows/rows.repository";
import { ADD_ROW_TO_DATASET_ERROR } from "../../constants/error.constants";
import { AddRowToDatasetError, AddRowToDatasetInDBError } from "../../exceptions/row.exceptions";
import { updateRowCountInDatasetInDB } from "../../repository/datasets/datasets.repository";

export async function addRowToDataset(payload: IAddRowToDatasetSchema){
    try {     
        const row = await addRowToDatasetInDB(payload);
        // Update row count in dataset
        await updateRowCountInDatasetInDB(payload.datasetId);
        return row;
    } catch (error) {
        if(error instanceof AddRowToDatasetInDBError) {
            throw error;
        }
        throw new AddRowToDatasetError(ADD_ROW_TO_DATASET_ERROR.message, ADD_ROW_TO_DATASET_ERROR.errorCode, ADD_ROW_TO_DATASET_ERROR.statusCode)
    }
}

export async function addRowItemToDataset(payload: IAddRowItemToDatasetSchema){
    try {
        return await addRowItemToDatasetInDB(payload);
    } catch (error) {
       
    }
}