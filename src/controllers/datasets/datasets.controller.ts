import { CREATE_DATASET_ERROR, FETCH_ALL_DATASETS_ERROR } from "../../constants/error.constants";
import { CreateDatasetError, CreateDatasetInDBError, FetchAllDatasetsError, FetchAllDatasetsFromDBError } from "../../exceptions/datasets.exceptions";
import { createDatasetInDB, fetchAllDatasetsFromDB } from "../../repository/datasets/datasets.repository";
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

export async function fetchAllDatasets(userId: string) {
    try {
        const datasets = await fetchAllDatasetsFromDB(userId);
        return datasets;
    } catch (error) {
        if (error instanceof FetchAllDatasetsFromDBError) {
            return { message: error.message, errorCode: error.errorCode, statusCode: error.statusCode };
        }
        throw new FetchAllDatasetsError(FETCH_ALL_DATASETS_ERROR.message, FETCH_ALL_DATASETS_ERROR.errorCode, FETCH_ALL_DATASETS_ERROR.statusCode)
    }
}