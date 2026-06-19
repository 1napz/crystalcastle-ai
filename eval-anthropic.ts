import { Eval } from "braintrust";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

Eval("Anthropic Evaluation", {
  // An array of user inputs and expected outputs
  data: () => [
    { input: "What is 2+2?", expected: "4" },
    { input: "What is the capital of France?", expected: "Paris" },
  ],
  task: async (input) => {
    // Your Anthropic LLM call
    const response = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      messages: [{ role: "user", content: input }],
    });
    return response.content[0].text;
  },
  scores: [
    {
      name: "accuracy",
      // A simple scorer that returns 1 if the output matches the expected output, 0 otherwise
      scorer: (args) => (args.output === args.expected ? 1 : 0),
    },
  ],
});