import { ADD_COLUMN_TO_DATASET_ERROR } from "../../constants/error.constants";
import { AddColumnToDatasetError, AddColumnToDatasetInDBError } from "../../exceptions/column.exceptions";
import { addColumnToDatasetInDB } from "../../repository/columns/columns.repository";
import { IAddColumnToDatasetSchema } from "../../routes/columns/columns.route";

export async function addColumnToDataset(payload: IAddColumnToDatasetSchema) {
    try {
        const column = await addColumnToDatasetInDB(payload);
        return column;
    } catch (error) {
        if (error instanceof AddColumnToDatasetInDBError) {
            return { message: error.message, errorCode: error.errorCode, statusCode: error.statusCode };
        }
        throw new AddColumnToDatasetError(ADD_COLUMN_TO_DATASET_ERROR.message, ADD_COLUMN_TO_DATASET_ERROR.errorCode, ADD_COLUMN_TO_DATASET_ERROR.statusCode)
    }
}