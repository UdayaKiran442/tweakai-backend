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
import openai, {
  createFinetuningJob,
  retrieveFinetuningJob,
} from "../../service/openai/openai.service";
import { fetchDatasetById } from "../datasets/datasets.controller";

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
    const response = await openai.chat.completions.create({
      model: model.finetunedModel as string,
      messages: [
        {
          role: "system",
          content: `You are a professional SEO content writer and optimization expert. Your task is to write a ${domain}-focused article based on the provided userInput. Ensure the content is SEO-optimized, engaging, and tailored to the audience's needs at the given stage. `,
        },
        {
          role: "user",
          content: `User Input: ${payload.userInput}\n\n`,
        },
        {
          role: "assistant",
          content:
            "Any important instructions you want me to follow while writing the article?",
        },
        {
          role: "user",
          content: `[IMPORTANT]
            1. Write a ${domain}-focused article that is engaging. \n\n
            2. Ensure the content is SEO-optimized and follows best practices for online readability. \n\n
            3. Adhere to the specified word limit and maintain a professional tone throughout the article. \n\n
            4. Include relevant keywords and phrases to enhance the article's search engine visibility. \n\n
            5. Provide a well-structured article that addresses the reader's needs and provides valuable insights. \n\n
            6. Ensure proper spacing between paragraphs and use subheadings to improve readability. \n\n`,
        },
        {
          role: "assistant",
          content: "How would you like me to format the response?",
        },
        {
          role: "user",
          content: `Do not include any explanations, only provide a RFC8259 compliant JSON response following this format without deviation. {${output
            .map((item) => `"${item}": ""`)
            .join(",\n")}}`,
        },
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    throw error;
  }
}
