import db from "../db";
import { columns } from "../schema";
import { IAddColumnToDatasetSchema } from "../../routes/columns/columns.route";
import { generateUuid } from "../../utils/generateUuid.utils";
import { AddColumnToDatasetInDBError } from "../../exceptions/column.exceptions";
import { ADD_COLUMN_TO_DATASET_IN_DB_ERROR } from "../../constants/error.constants";

export async function addColumnToDatasetInDB(payload: IAddColumnToDatasetSchema) {
    try {
        const insertPayload = {
            columnId:  `column-${generateUuid()}`,
            name: payload.name,
            datasetId: payload.datasetId,
            type: payload.type,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await db.insert(columns).values(insertPayload);
        return insertPayload;
    } catch (error) {
        throw new AddColumnToDatasetInDBError(ADD_COLUMN_TO_DATASET_IN_DB_ERROR.message, ADD_COLUMN_TO_DATASET_IN_DB_ERROR.errorCode, ADD_COLUMN_TO_DATASET_IN_DB_ERROR.statusCode)
    }
}