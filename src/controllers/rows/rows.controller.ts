import { IAddRowToDatasetSchema } from "../../routes/rows/rows.route";
import { addRowToDatasetInDB } from "../../repository/rows/rows.repository";
import { ADD_ROW_TO_DATASET_ERROR } from "../../constants/error.constants";
import { AddRowToDatasetError, AddRowToDatasetInDBError } from "../../exceptions/row.exceptions";

export async function addRowToDataset(payload: IAddRowToDatasetSchema){
    try {     
        return await addRowToDatasetInDB(payload);
    } catch (error) {
        if(error instanceof AddRowToDatasetInDBError) {
            throw error;
        }
        throw new AddRowToDatasetError(ADD_ROW_TO_DATASET_ERROR.message, ADD_ROW_TO_DATASET_ERROR.errorCode, ADD_ROW_TO_DATASET_ERROR.statusCode)
    }
}