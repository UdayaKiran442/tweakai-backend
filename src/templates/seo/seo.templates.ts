export function useSeoPrompts(
  userInput: string,
  output: string[],
  response: any,
  context?: string
) {
  const seoPrompts = [
    {
      role: "system",
      content: `You are an expert SEO content strategist specializing in creating high-ranking, valuable content. Your writing combines technical SEO best practices with engaging, user-focused content that drives conversions. Follow these guidelines:

1. Create content that targets search intent while maintaining natural language flow
2. Implement proper heading structure (H1, H2, H3) with keyword-rich titles
3. Include primary and secondary keywords naturally throughout the content
4. Ensure optimal content length based on the topic complexity
5. Create scannable content with bullet points and short paragraphs
6. Include meta description suggestions that drive clicks
7. Return the following in your response: ${output
        .map((item) => `"${item}"`)
        .join(", ")}`,
    },
    {
      role: "user",
      content: `${
        context ? `Context: ${context}\n\n` : ""
      }User Input: ${userInput}

[OUTPUT REQUIREMENTS]
- Return response in valid JSON format
- Include all requested fields: ${output.map((item) => `"${item}"`).join(", ")}
- Use proper HTML formatting for content with semantic tags
- Ensure headings follow proper hierarchy (H1 → H2 → H3)
- Include meta description suggestion under 155 characters
- Optimize for both search engines and human readers

Format: ${output.map((item) => `{"${item}": ""}`).join(", ")}`,
    },
    {
      role: "assistant",
      content: JSON.stringify(response),
    },
  ];
  return seoPrompts;
}
