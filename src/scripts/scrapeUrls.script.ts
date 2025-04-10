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

    // Remove known unwanted elements
    const removeElements = `
      script, style, noscript, iframe, img, button, input, form,
      nav, header, footer, aside, .sidebar, .nav, .menu, .breadcrumb,
      .pagination, .author-info, .social-share, .comments, .advertisement,
      .related-content, .table-of-contents, .toc, #toc, .navigation, .meta,
      .tags, .categories, .share, .rating, a
    `;
    $(removeElements).remove();

    // Determine the main content container using a whitelist of selectors
    const contentSelectors = [
      "article",
      "main",
      ".article-content",
      ".post-content",
      ".entry-content",
      ".content-area",
      ".main-content",
      "#content",
      ".article-body",
      ".post-body",
    ];

    let $mainContent = $("body") as any;
    for (const selector of contentSelectors) {
      if ($(selector).length) {
        $mainContent = $(selector);
        break;
      }
    }

    let htmlContent = "";

    // Define the allowed tags
    const allowedTags = new Set(["h1", "h2", "h3", "h4", "h5", "h6", "p"]);

    // Recursive function to traverse nodes in order
    const traverseAndExtract = function ($element: any) {
      $element.contents().each(function (this: any) {
        // Only process element nodes (e.g., not comments)
        if (this.type === "tag") {
          if (allowedTags.has(this.name)) {
            // Append the tag's outer HTML with trimmed text content
            const text = $(this).text().trim();
            if (text && text.length > 5) {
              // ignore fragments that are too short
              htmlContent += `<${this.name}>${text}</${this.name}>\n`;
            }
          } else {
            // Even if this is not an allowed tag, it may contain allowed children
            traverseAndExtract($(this));
          }
        }
      });
    };

    traverseAndExtract($mainContent);

    // Fallback: if no allowed elements were found, use a simpler approach.
    if (!htmlContent) {
      htmlContent = $mainContent
        .text()
        .split("\n")
        .map((text: any) => {
          const trimmed = text.trim();
          return trimmed && trimmed.length > 5 ? `<p>${trimmed}</p>` : "";
        })
        .join("\n");
    }

    // Extract the title from the first <h1> encountered as a basic example
    const title = $("h1").first().text().trim();

    return { title, content: htmlContent };
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
        datasetId: "dataset-d2e7584d-c8c3-4ccf-8b9b-3e990e5d4857",
        userId: "user_2unMRKbdYAHWYIIN9ROntWZpWZq",
      });
      console.log(`Added row to dataset for ${index}th blog`);
      // for each entry add new row item
      const [htmlContent, title] = await Promise.all([
        addRowItemToDataset({
          columnId: "column-5dd836b2-5c5e-48c5-a18c-9128c0b12eab",
          data: blog["content"],
          rowId: row.rowId,
          userId: "user_2unMRKbdYAHWYIIN9ROntWZpWZq",
        }),
        addRowItemToDataset({
          columnId: "column-44153f20-caac-4e7f-8d3c-0bc363223043",
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
