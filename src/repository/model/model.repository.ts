import { eq } from "drizzle-orm";

import db from "../db";
import { ITrainDatasetSchema } from "../../routes/v1/model/model.route";
import { generateUuid } from "../../utils/generateUuid.utils";
import { model, ITemplateEnum, IModelStatusEnum, IModel } from "../schema";

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

export async function updateModelStatusInDb(payload: {
  modelId: string;
  status: IModelStatusEnum;
}) {
  try {
    await db
      .update(model)
      .set({ status: payload.status })
      .where(eq(model.modelId, payload.modelId));
  } catch (error) {
    throw error;
  }
}

export async function updateModelInDB(payload: IModel) {
  try {
    const updatedPayload = {
      ...payload,
      updatedAt: new Date(),
    };
    await db
      .update(model)
      .set(updatedPayload)
      .where(eq(model.modelId, payload.modelId));
    return updatedPayload;
  } catch (error) {
    throw error;
  }
}

export async function getModelByJobIdInDB(jobId: string) {
  try {
    return await db.select().from(model).where(eq(model.jobId, jobId));
  } catch (error) {
    throw error;
  }
}

export async function getModelByModelIdInDB(modelId: string) {
  try {
    const trainedModel = await db.select().from(model).where(eq(model.modelId, modelId));
    return trainedModel[0];
  } catch (error) {
    throw error;
  }
}
