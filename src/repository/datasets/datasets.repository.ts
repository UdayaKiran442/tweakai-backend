import db from "../db";
import { ICreateDatasetSchema } from "../../routes/datasets/datasets.route";
import { generateUuid } from "../../utils/generateUuid.utils";
import { datasets } from "../schema";
import { CreateDatasetInDBError } from "../../exceptions/datasets.exceptions";
import { CREATE_DATASET_IN_DB_ERROR } from "../../constants/error.constants";

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