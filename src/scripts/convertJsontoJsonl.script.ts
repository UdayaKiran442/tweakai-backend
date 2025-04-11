import * as fs from "fs";
import * as path from "path";

import { useSeoPrompts } from "../templates/seo/seo.templates";
import resumeBlogData from "./data.json";

export function generateResumeBlogJsonLFile() {
  let fileContent = "";
  for (const data of resumeBlogData) {
    let userInput = "";
    userInput += `${data["Meta Title"]}\n${data["Audience"]}\n${data["Stage"]}`;

    const response = useSeoPrompts(
      userInput,
      ["metaDescription", "article", "urlSlug"],
      {
        article: data["Content"],
        metaDescription: data["Meta Description"],
        urlSlug: data["URL Slug"],
      },
      "resume"
    );
    fileContent += JSON.stringify(response) + "\n";
  }
  // write file content to a JSONL file which is present in same folder
  console.log(__dirname);
  fs.writeFileSync(path.join(__dirname, "data.jsonl"), fileContent);
  return fileContent;
}
