import { ITrainDatasetSchema } from "../../routes/v1/model/model.route";
import { convertDataToJSONL } from "../../scripts/convertDataToJSONL.script";

export async function trainDataset(payload: ITrainDatasetSchema) {
  try {
    // call the script
    const response = await convertDataToJSONL(payload);
    // send jsonl file for training to openai
    // TODO: open ai service integration
  } catch (error) {}
}
