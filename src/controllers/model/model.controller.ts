import * as fs from "fs";

import {
  addModelInDb,
  getModelByJobIdInDB,
  updateModelInDB,
} from "../../repository/model/model.repository";
import { ITrainDatasetSchema } from "../../routes/v1/model/model.route";
import { convertDataToJSONLScript } from "../../scripts/convertDataToJSONL.script";
import {
  createFinetuningJob,
  retrieveFinetuningJob,
} from "../../service/openai/openai.service";

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
