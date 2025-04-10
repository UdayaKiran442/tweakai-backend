export function useSeoPrompts(
  userInput: string,
  output: string[],
  response: any
) {
  const seoPrompts = [
    {
      role: "system",
      content: `You are an expert SEO content strategist specializing in crafting well-structured, engaging content optimized for search engines and human readers. Follow these guidelines carefully:

1. Clearly address user search intent with valuable and relevant information.
2. Utilize semantic HTML tags, including a clear hierarchical structure (H1, H2, H3).
3. Include primary and secondary keywords naturally throughout the content.
4. Create scannable content using short paragraphs, bullet lists, and numbered lists.
5. Optimize content length to match the complexity of the topic.
6. Provide a concise, keyword-rich meta description under 155 characters.`,
    },
    {
      role: "user",
      content: `Write an SEO-optimized response for the following:

Title: ${userInput}

Include the following required fields in your response: ${output
        .map((item) => `"${item}"`)
        .join(", ")}.

Output Format (JSON):
{
${output.map((item) => `  "${item}": ""`).join(",\n")}
}

Guidelines:
- Ensure your response is structured with proper HTML tags and heading hierarchy.
- Include an engaging meta description.
- Maintain readability for both users and search engines.`,
    },
    {
      role: "assistant",
      content: JSON.stringify(response),
    },
  ];
  return { messages: seoPrompts };
}
