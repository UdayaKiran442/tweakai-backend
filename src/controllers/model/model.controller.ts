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
  retrieveFinetuningJob,
} from "../../service/openai/openai.service";
import { fetchDatasetById } from "../datasets/datasets.controller";
import { seoPrompt } from "../../constants/prompt.constants";

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
    throw error;
  } finally {
    // delete jsonl file
    fs.unlinkSync(outputPath);
  }
}

export async function getFinetuningJob(jobId: string) {
  try {
    // get job from openai
    const job = await retrieveFinetuningJob(jobId);
    // update model status in db
    if (job.status === "succeeded") {
      const model = await getModelByJobIdInDB(jobId);
      await updateModelInDB({
        modelId: model[0].modelId,
        status: job.status,
        finetunedModel: job.fine_tuned_model,
      });
    }
    if (job.status === "failed") {
      await updateModelInDB({
        modelId: jobId,
        status: job.status,
      });
    }
    return job;
  } catch (error) {
    throw error;
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
