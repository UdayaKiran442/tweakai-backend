import db from "../db";
import { ADD_ROW_TO_DATASET_IN_DB_ERROR } from "../../constants/error.constants";
import { IAddRowToDatasetSchema } from "../../routes/rows/rows.route";
import { generateUuid } from "../../utils/generateUuid.utils";
import { rows } from "../schema";
import { AddRowToDatasetInDBError } from "../../exceptions/row.exceptions";

export async function addRowToDatasetInDB(payload: IAddRowToDatasetSchema){
    try {
        const insertPayload = {
            rowId: `row-${generateUuid()}`,
            datasetId: payload.datasetId,
            columnId: payload.columnId,
            userId: payload.userId,
            data: payload.data,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await db.insert(rows).values(insertPayload);
        return insertPayload;
    } catch (error) {
        throw new AddRowToDatasetInDBError(ADD_ROW_TO_DATASET_IN_DB_ERROR.message, ADD_ROW_TO_DATASET_IN_DB_ERROR.errorCode, ADD_ROW_TO_DATASET_IN_DB_ERROR.statusCode)
    }
}