import { CREATE_DATASET_ERROR, FETCH_ALL_DATASETS_ERROR, FETCH_DATASET_BY_ID_ERROR } from "../../constants/error.constants";
import { CreateDatasetError, CreateDatasetInDBError, FetchAllDatasetsError, FetchAllDatasetsFromDBError, FetchDatasetByIdError, FetchDatasetByIdFromDBError } from "../../exceptions/datasets.exceptions";
import { createDatasetInDB, fetchAllDatasetsFromDB, fetchDatasetByIdFromDB } from "../../repository/datasets/datasets.repository";
import { ICreateDatasetSchema, IFetchDatasetByIdSchema } from "../../routes/datasets/datasets.route";

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

export async function fetchDatasetById(payload: IFetchDatasetByIdSchema) {
    try {
        return await fetchDatasetByIdFromDB(payload.datasetId);
    } catch (error) {
        if (error instanceof FetchDatasetByIdFromDBError) {
            return { message: error.message, errorCode: error.errorCode, statusCode: error.statusCode };
        }
        throw new FetchDatasetByIdError(FETCH_DATASET_BY_ID_ERROR.message, FETCH_DATASET_BY_ID_ERROR.errorCode, FETCH_DATASET_BY_ID_ERROR.statusCode)
    }
}