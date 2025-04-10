import db from "../db";
import { ITrainDatasetSchema } from "../../routes/v1/model/model.route";
import { generateUuid } from "../../utils/generateUuid.utils";
import { model, ITemplateEnum, IModelStatusEnum } from "../schema";

export async function addModelInDb(payload: ITrainDatasetSchema) {
  try {
    // Ensure template is one of the valid enum values
    const templateValue = payload.template as ITemplateEnum;

    const insertPayload = {
      modelId: `model-${generateUuid()}`,
      userId: payload.userId,
      datasetId: payload.datasetId,
      jobId: payload.jobId,
      name: payload.name,
      template: templateValue,
      description: payload.description,
      status: "pending" as IModelStatusEnum,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await db.insert(model).values(insertPayload);
    return insertPayload;
  } catch (error) {
    throw error;
  }
}
