import db from "../db";
import { ADD_ROW_TO_DATASET_IN_DB_ERROR } from "../../constants/error.constants";
import { IAddRowItemToDatasetSchema, IAddRowToDatasetSchema } from "../../routes/rows/rows.route";
import { generateUuid } from "../../utils/generateUuid.utils";
import { rowItems, rows } from "../schema";
import { AddRowToDatasetInDBError } from "../../exceptions/row.exceptions";

export async function addRowToDatasetInDB(payload: IAddRowToDatasetSchema){
    try {
        const insertPayload = {
            rowId: `row-${generateUuid()}`,
            datasetId: payload.datasetId,
            userId: payload.userId,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await db.insert(rows).values(insertPayload);
        return insertPayload;
    } catch (error) {
        throw new AddRowToDatasetInDBError(ADD_ROW_TO_DATASET_IN_DB_ERROR.message, ADD_ROW_TO_DATASET_IN_DB_ERROR.errorCode, ADD_ROW_TO_DATASET_IN_DB_ERROR.statusCode)
    }
}

export async function addRowItemToDatasetInDB(payload: IAddRowItemToDatasetSchema){
    try {
        const insertPayload = {
            rowItemId: `row-item-${generateUuid()}`,
            rowId: payload.rowId,
            columnId: payload.columnId,
            data: payload.data,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await db.insert(rowItems).values(insertPayload);
        return insertPayload;
    } catch (error) {
        
    }
}