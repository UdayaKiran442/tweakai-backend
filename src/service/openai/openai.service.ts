import { OpenAI } from "openai";

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
    return await openai.fineTuning.jobs.create({
      training_file: filePath,
      model: "gpt-4o-mini",
    });
  } catch (error) {
    throw new CreateFinetuningJobError(
      CREATE_FINETUNING_JOB_ERROR.message,
      CREATE_FINETUNING_JOB_ERROR.errorCode,
      CREATE_FINETUNING_JOB_ERROR.statusCode
    );
  }
}
