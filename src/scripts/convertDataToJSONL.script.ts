import * as fs from "fs";
import * as path from "path";

import { fetchDatasetById } from "../controllers/datasets/datasets.controller";
import { useSeoPrompts } from "../prompts/seo/seo.prompts";

export async function convertDataToJSONL() {
  // fetch dataset
  const dataset = await fetchDatasetById({
    datasetId: "dataset-75626bdb-9602-4155-808e-0035f34f6e8e",
    userId: "user_2unMRKbdYAHWYIIN9ROntWZpWZq",
  });

  const jsonlData: string[] = [];

  dataset.forEach((row) => {
    let userInput = "";
    let output: string[] = [];
    let response: any = {};
    const context = "these is some context";

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
    const messages = useSeoPrompts(userInput, context, output, response);

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
  };
}
