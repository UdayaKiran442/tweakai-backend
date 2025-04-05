export function useSeoPrompts(
  userInput: string,
  context: string,
  output: string[],
  response: any
) {
  const seoPrompts = [
    {
      role: "system",
      content: `You are an expert SEO writer and optimizer. Your task is to write an SEO optimised blog based on given user input and context. Ensure the blog is optimised for SEO. Provide ${output
        .map((item) => `"${item}"`)
        .join(", ")} in the response.`,
    },
    {
      role: "user",
      content: `User Input: ${userInput}\nContext: ${context}`,
    },
    {
      role: "assistant",
      content: "Do you want me to follow any important instructions?",
    },
    {
      role: "user",
      content: `[IMPORTANT]
      1. Ensure the blog is optimised for SEO.
      2. Make sure you follow the instructions given by the user.
      3. Ensure the blog consists of keywords and headings for better SEO.
      4. Use proper HTML tags for headings and paragraphs.
      5. Return the blog in HTML format.
      `,
    },
    {
      role: "assistant",
      content: "How do you want me to return the response?",
    },
    {
      role: "user",
      content: `Return the response in JSON format. ${output
        .map((item) => `{"${item}": ""}`)
        .join(", ")}`,
    },
    {
      role: "assistant",
      content: JSON.stringify(response),
    },
  ];
  return seoPrompts;
}
