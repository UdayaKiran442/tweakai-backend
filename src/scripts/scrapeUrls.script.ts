import axios from "axios";
import * as cheerio from "cheerio";
import {
  addRowItemToDataset,
  addRowToDataset,
} from "../controllers/rows/rows.controller";

async function scrapeBlog(url: string) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const title = $("h1").first().text().trim();

    // Remove unwanted elements
    $("img, script, style, iframe, noscript, footer, header, nav").remove();

    // Extract only meaningful content
    const mainContent =
      $("h1").first().prop("outerHTML") +
      $("p")
        .map((i, el) => $(el).prop("outerHTML"))
        .get()
        .join("");

    return { title, htmlContent: mainContent };
  } catch (error: any) {
    console.error(`Error scraping ${url}:`, error.message);
    return null;
  }
}

export async function scrapeBlogs(urls: string[]) {
  let index = 1;
  for (const url of urls) {
    const blog = await scrapeBlog(url);
    console.log(`Scraped ${index}th blog`);
    if (blog) {
      // save data to db
      // for each blog add new row
      const row = await addRowToDataset({
        datasetId: "dataset-4257967e-6c5f-4e89-8570-aa7bb8f03832",
        userId: "user_2unMRKbdYAHWYIIN9ROntWZpWZq",
      });
      console.log(`Added row to dataset for ${index}th blog`);
      // for each entry add new row item
      const [htmlContent, title] = await Promise.all([
        addRowItemToDataset({
          columnId: "column-c8783a6c-ec43-4c5b-9652-3de2a6df22cc",
          data: blog["htmlContent"],
          rowId: row.rowId,
          userId: "user_2unMRKbdYAHWYIIN9ROntWZpWZq",
        }),
        addRowItemToDataset({
          columnId: "column-e138374a-1ed1-4f82-a67a-0f09d1a5e3cb",
          data: blog["title"],
          rowId: row.rowId,
          userId: "user_2unMRKbdYAHWYIIN9ROntWZpWZq",
        }),
      ]);
      console.log(`Added row items to dataset for ${index}th blog`);
      index++;
    }
  }
  return { success: true, message: "Blogs scraped successfully" };
}
