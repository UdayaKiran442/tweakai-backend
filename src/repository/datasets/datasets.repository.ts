import db from "../db";
import { eq } from "drizzle-orm";

import { ICreateDatasetSchema } from "../../routes/datasets/datasets.route";
import { generateUuid } from "../../utils/generateUuid.utils";
import { columns, datasets, rows } from "../schema";
import { CreateDatasetInDBError, FetchAllDatasetsFromDBError, FetchDatasetByIdFromDBError } from "../../exceptions/datasets.exceptions";
import { CREATE_DATASET_IN_DB_ERROR, FETCH_ALL_DATASETS_FROM_DB_ERROR, FETCH_DATASET_BY_ID_FROM_DB_ERROR } from "../../constants/error.constants";

export async function createDatasetInDB(payload: ICreateDatasetSchema) {
    try {
        const insertPayload = {
            datasetId: `dataset-${generateUuid()}`,
            name: payload.name,
            description: payload.description,
            template: payload.template,
            userId: payload.userId,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await db.insert(datasets).values(insertPayload);
        return insertPayload;
    } catch (error) {
        throw new CreateDatasetInDBError(CREATE_DATASET_IN_DB_ERROR.message, CREATE_DATASET_IN_DB_ERROR.errorCode, CREATE_DATASET_IN_DB_ERROR.statusCode)
    }
}

export async function fetchAllDatasetsFromDB(userId: string) {
    try {
        return await db.select().from(datasets).where(eq(datasets.userId, userId));
    } catch (error) {
        throw new FetchAllDatasetsFromDBError(FETCH_ALL_DATASETS_FROM_DB_ERROR.message, FETCH_ALL_DATASETS_FROM_DB_ERROR.errorCode, FETCH_ALL_DATASETS_FROM_DB_ERROR.statusCode)
    }
}

export async function fetchDatasetByIdFromDB(datasetId: string) {
    try {
        return await db.select({
            datasetId: datasets.datasetId,
            columnId: columns.columnId,
            rowId: rows.rowId,
            datasetName: datasets.name,
            userId: datasets.userId,
            description: datasets.description,
            template: datasets.template,
            columnName: columns.name,
            columnType: columns.type,
            rowData: rows.data
        }).from(datasets).where(eq(datasets.datasetId, datasetId)).leftJoin(columns, eq(columns.datasetId, datasets.datasetId)).leftJoin(rows, eq(rows.columnId, columns.columnId));
    } catch (error) {
        throw new FetchDatasetByIdFromDBError(FETCH_DATASET_BY_ID_FROM_DB_ERROR.message, FETCH_DATASET_BY_ID_FROM_DB_ERROR.errorCode, FETCH_DATASET_BY_ID_FROM_DB_ERROR.statusCode)
    }
}