import { addModelInDb } from "../../repository/model/model.repository";
import { ITrainDatasetSchema } from "../../routes/v1/model/model.route";
import { convertDataToJSONL } from "../../scripts/convertDataToJSONL.script";

export async function trainDataset(payload: ITrainDatasetSchema) {
  try {
    // call the script
    const response = await convertDataToJSONL(payload);
    // send jsonl file for training to openai
    // TODO: open ai service integration
    // save model
    const newModel = await addModelInDb(payload);
    return { response, newModel };
  } catch (error) {
    throw error;
  }
}
