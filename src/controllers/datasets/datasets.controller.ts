import { CREATE_DATASET_ERROR } from "../../constants/error.constants";
import { CreateDatasetError, CreateDatasetInDBError } from "../../exceptions/datasets.exceptions";
import { createDatasetInDB } from "../../repository/datasets/datasets.repository";
import { ICreateDatasetSchema } from "../../routes/datasets/datasets.route";

export async function createDataset(payload: ICreateDatasetSchema) {
    try {
        const dataset = await createDatasetInDB(payload);
        return dataset;
    } catch (error) {
        if (error instanceof CreateDatasetInDBError) {
            return { message: error.message, errorCode: error.errorCode, statusCode: error.statusCode };
        }
        throw new CreateDatasetError(CREATE_DATASET_ERROR.message, CREATE_DATASET_ERROR.errorCode, CREATE_DATASET_ERROR.statusCode)
    }
}