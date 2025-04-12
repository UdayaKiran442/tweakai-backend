import * as fs from "fs";

import {
  addModelInDb,
  getModelByJobIdInDB,
  getModelByModelIdInDB,
  updateModelInDB,
} from "../../repository/model/model.repository";
import {
  IGenerateResponseSchema,
  ITrainDatasetSchema,
} from "../../routes/v1/model/model.route";
import { convertDataToJSONLScript } from "../../scripts/convertDataToJSONL.script";
import {
  createFinetuningJob,
  generateResponseFromOpenAI,
  retrieveFinetuningJobFromOpenAI,
} from "../../service/openai/openai.service";
import { fetchDatasetById } from "../datasets/datasets.controller";
import { seoPrompt } from "../../constants/prompt.constants";
import { ConvertDataToJSONLScriptError } from "../../exceptions/script.exceptions";
import { FetchDatasetByIdError } from "../../exceptions/datasets.exceptions";
import {
  CreateFinetuningJobError,
  RetrieveFinetuningJobFromOpenAIError,
} from "../../exceptions/openai.exceptions";
import {
  AddModelInDbError,
  GetFinetuningJobError,
  GetModelByJobIdInDbError,
  TrainDatasetError,
  UpdateModelInDbError,
} from "../../exceptions/modal.exceptions";
import {
  GET_FINETUNING_JOB_ERROR,
  TRAIN_DATASET_ERROR,
} from "../../constants/error.constants";

export async function trainDataset(payload: ITrainDatasetSchema) {
  let outputPath = "";
  try {
    // call the script to convert dataset to jsonl
    const response = await convertDataToJSONLScript(payload);
    outputPath = response.outputPath;
    // send jsonl file for training to openai
    const job = await createFinetuningJob(response.outputPath);
    // save model in db
    payload.jobId = job.id;
    const newModel = await addModelInDb(payload);
    return { response, newModel, job: job._request_id };
  } catch (error) {
    if (
      error instanceof ConvertDataToJSONLScriptError ||
      error instanceof FetchDatasetByIdError ||
      error instanceof CreateFinetuningJobError ||
      error instanceof AddModelInDbError
    ) {
      throw error;
    }
    throw new TrainDatasetError(
      TRAIN_DATASET_ERROR.message,
      TRAIN_DATASET_ERROR.errorCode,
      TRAIN_DATASET_ERROR.statusCode
    );
  } finally {
    // delete jsonl file after sent for training
    fs.unlinkSync(outputPath);
  }
}

export async function getFinetuningJob(jobId: string) {
  try {
    // get job from openai
    const job = await retrieveFinetuningJobFromOpenAI(jobId);
    const model = await getModelByJobIdInDB(jobId);
    // update model status in db
    if (job.status === "succeeded") {
      await updateModelInDB({
        modelId: model[0].modelId,
        status: job.status,
        finetunedModel: job.fine_tuned_model,
      });
    }
    if (job.status === "failed") {
      await updateModelInDB({
        modelId: model[0].modelId,
        status: job.status,
      });
    }
    return job;
  } catch (error) {
    if (
      error instanceof RetrieveFinetuningJobFromOpenAIError ||
      error instanceof GetModelByJobIdInDbError ||
      error instanceof UpdateModelInDbError
    ) {
      throw error;
    }
    throw new GetFinetuningJobError(
      GET_FINETUNING_JOB_ERROR.message,
      GET_FINETUNING_JOB_ERROR.errorCode,
      GET_FINETUNING_JOB_ERROR.statusCode
    );
  }
}

export async function generateResponse(payload: IGenerateResponseSchema) {
  try {
    const model = await getModelByModelIdInDB(payload.modelId);
    const dataset = await fetchDatasetById({
      datasetId: model.datasetId,
      userId: payload.userId,
    });
    const items = dataset[0].items;
    let output: string[] = [];
    items.forEach((item) => {
      if (item.columnType === "output") {
        output.push(item.columnName);
      }
    });
    const domain = "resume";
    const prompt = seoPrompt({
      userInput: payload.userInput,
      domain,
      output,
    });
    const response = await generateResponseFromOpenAI({
      model: model.finetunedModel as string,
      prompt,
    });
    return JSON.parse(response);
  } catch (error) {
    throw error;
  }
}
