/**
 * Controller for dataset operations
 *
 * This module handles dataset operations, and business logic related to datasets such as creating, fetching, and updating datasets.
 */

import {
  CREATE_DATASET_ERROR,
  DELETE_DATASET_ERROR,
  FETCH_ALL_DATASETS_ERROR,
  FETCH_DATASET_BY_ID_ERROR,
} from "../../constants/error.constants";
import {
  CreateDatasetError,
  CreateDatasetInDBError,
  DeleteDatasetError,
  DeleteDatasetFromDBError,
  FetchAllDatasetsError,
  FetchAllDatasetsFromDBError,
  FetchDatasetByIdError,
  FetchDatasetByIdFromDBError,
} from "../../exceptions/datasets.exceptions";
import {
  createDatasetInDB,
  deleteDatasetFromDB,
  fetchAllDatasetsFromDB,
  fetchDatasetByIdFromDB,
} from "../../repository/datasets/datasets.repository";
import {
  ICreateDatasetSchema,
  IDeleteDatasetSchema,
  IFetchDatasetByIdSchema,
} from "../../routes/v1/datasets/datasets.route";

/**
 * Controller for creating a new dataset
 * @param payload - Dataset information (name, description, template, userId)
 * @returns Newly created dataset object
 * @throws CreateDatasetError if dataset cannot be created, throws respective db errors if database operation fails
 */

export async function createDataset(payload: ICreateDatasetSchema) {
  try {
    const dataset = await createDatasetInDB(payload);
    return dataset;
  } catch (error) {
    if (error instanceof CreateDatasetInDBError) {
      throw error;
    }
    throw new CreateDatasetError(
      CREATE_DATASET_ERROR.message,
      CREATE_DATASET_ERROR.errorCode,
      CREATE_DATASET_ERROR.statusCode
    );
  }
}

/**
 * Controller for fetching all datasets
 * @param userId - User ID
 * @returns Array of dataset objects
 * @throws FetchAllDatasetsError if datasets cannot be fetched, throws respective db errors if database operation fails
 */
export async function fetchAllDatasets(userId: string) {
  try {
    const datasets = await fetchAllDatasetsFromDB(userId);
    return datasets;
  } catch (error) {
    if (error instanceof FetchAllDatasetsFromDBError) {
      throw error;
    }
    throw new FetchAllDatasetsError(
      FETCH_ALL_DATASETS_ERROR.message,
      FETCH_ALL_DATASETS_ERROR.errorCode,
      FETCH_ALL_DATASETS_ERROR.statusCode
    );
  }
}

/**
 * Controller for fetching a dataset by ID
 * @param payload - Dataset ID
 * @returns Dataset object
 * @throws FetchDatasetByIdError if dataset cannot be fetched, throws respective db errors if database operation fails
 */
export async function fetchDatasetById(payload: IFetchDatasetByIdSchema) {
  try {
    return await fetchDatasetByIdFromDB(payload.datasetId);
  } catch (error) {
    if (error instanceof FetchDatasetByIdFromDBError) {
      throw error;
    }
    throw new FetchDatasetByIdError(
      FETCH_DATASET_BY_ID_ERROR.message,
      FETCH_DATASET_BY_ID_ERROR.errorCode,
      FETCH_DATASET_BY_ID_ERROR.statusCode
    );
  }
}

/**
 * Controller for deleting a dataset by ID
 * @param payload - Dataset ID
 * @returns Deleted dataset object
 * @throws DeleteDatasetError if dataset cannot be deleted, throws respective db errors if database operation fails
 */
export async function deleteDataset(payload: IDeleteDatasetSchema) {
  try {
    return await deleteDatasetFromDB(payload);
  } catch (error) {
    if (error instanceof DeleteDatasetFromDBError) {
      throw error;
    }
    throw new DeleteDatasetError(
      DELETE_DATASET_ERROR.message,
      DELETE_DATASET_ERROR.errorCode,
      DELETE_DATASET_ERROR.statusCode
    );
  }
}
