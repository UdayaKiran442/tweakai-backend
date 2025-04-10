import { addModelInDb } from "../../repository/model/model.repository";
import { ITrainDatasetSchema } from "../../routes/v1/model/model.route";
import { convertDataToJSONL } from "../../scripts/convertDataToJSONL.script";
import { createFinetuningJob } from "../../service/openai/openai.service";

export async function trainDataset(payload: ITrainDatasetSchema) {
  try {
    // call the script
    const response = await convertDataToJSONL(payload);
    // send jsonl file for training to openai
    // TODO: open ai service integration
    const job = await createFinetuningJob(response.outputPath);
    // save model
    payload.jobId = job.id
    const newModel = await addModelInDb(payload);
    return { response, newModel, job: job._request_id };
  } catch (error) {
    throw error;
  }
}
