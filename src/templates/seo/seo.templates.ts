export function useSeoPrompts(
  userInput: string,
  output: string[],
  response: any,
  domain: string
) {
  const seoPrompts = [
    {
      role: "system",
      content: `You are a professional SEO content writer and optimization expert. Your task is to write a ${domain}-focused article based on the provided userInput. Ensure the content is SEO-optimized, engaging, and tailored to the audience's needs at the given stage. `,
    },
    {
      role: "user",
      content: `User Input: ${userInput}`,
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
    {
      role: "assistant",
      content: response,
    },
  ];
  return seoPrompts;
}
