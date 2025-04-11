import { OpenAI } from "openai";
import * as fs from "fs";

import { ActiveConfig } from "../../utils/config.utils";
import {
  CreateFinetuningJobError,
  RetrieveFinetuningJobError,
} from "../../exceptions/openai.exceptions";
import {
  CREATE_FINETUNING_JOB_ERROR,
  RETRIEVE_FINETUNING_JOB_ERROR,
} from "../../constants/error.constants";

const openai = new OpenAI({
  apiKey: ActiveConfig.OPENAI_API_KEY,
});

export async function retrieveFinetuningJob(jobId: string) {
  try {
    return await openai.fineTuning.jobs.retrieve(jobId);
  } catch (error) {
    throw new RetrieveFinetuningJobError(
      RETRIEVE_FINETUNING_JOB_ERROR.message,
      RETRIEVE_FINETUNING_JOB_ERROR.errorCode,
      RETRIEVE_FINETUNING_JOB_ERROR.statusCode
    );
  }
}

export async function createFinetuningJob(filePath: string) {
  try {
    const file = await uploadTrainingFile(filePath);
    return await openai.fineTuning.jobs.create({
      training_file: file.id,
      model: "gpt-4o-mini-2024-07-18",
      hyperparameters: {
        batch_size: 4,
        n_epochs: 3,
        learning_rate_multiplier: 0.02,
      },
    });
  } catch (error) {
    throw new CreateFinetuningJobError(
      CREATE_FINETUNING_JOB_ERROR.message,
      CREATE_FINETUNING_JOB_ERROR.errorCode,
      CREATE_FINETUNING_JOB_ERROR.statusCode
    );
  }
}

export async function uploadTrainingFile(filePath: string) {
  try {
    const files = await openai.files.create({
      file: fs.createReadStream(filePath),
      purpose: "fine-tune",
    });
    return files;
  } catch (error) {
    throw error;
  }
}

export async function generateResponseFromOpenAI(payload: {
  prompt: any;
  model: string;
}) {
  try {
    const response = await openai.chat.completions.create({
      model: payload.model,
      messages: payload.prompt,
      response_format: {
        type: "json_object",
      },
      temperature: 0.5,
    });
    return response.choices[0].message.content as string;
  } catch (error) {
    throw error;
  }
}

export default openai;
