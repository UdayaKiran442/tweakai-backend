import * as fs from "fs";
import * as path from "path";

import { fetchDatasetById } from "../controllers/datasets/datasets.controller";
import { useSeoPrompts } from "../templates/seo/seo.templates";
import { ITrainDatasetSchema } from "../routes/v1/model/model.route";

export async function convertDataToJSONL(payload: ITrainDatasetSchema) {
  try {
    // fetch dataset
    const dataset = await fetchDatasetById({
      datasetId: payload.datasetId,
      userId: payload.userId,
    });

    const jsonlData: string[] = [];

    dataset.forEach((row) => {
      let userInput = "";
      let output: string[] = [];
      let response: any = {};

      // First pass to collect all inputs and outputs
      row.items.forEach((item) => {
        if (item.columnType === "input") {
          userInput += `${item.columnName}: ${item.data}\n`;
        }
        if (item.columnType === "output") {
          output.push(item.columnName);
          response[item.columnName] = item.data;
        }
      });

      // Generate the conversation messages
      const messages = useSeoPrompts(userInput, output, response);

      // Format exactly as in the example - each message is a separate object in the array
      jsonlData.push(JSON.stringify({ messages }));
    });

    // Write to file
    const outputDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, "seo_dataset.jsonl");
    fs.writeFileSync(outputPath, jsonlData.join("\n"));

    return {
      success: true,
      message: `JSONL file created at ${outputPath}`,
      count: jsonlData.length,
      sample: jsonlData.length > 0 ? JSON.parse(jsonlData[0]) : null,
      outputPath,
    };
  } catch (error) {
    throw error;
  }
}
