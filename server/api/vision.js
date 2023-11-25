import { OpenAI } from "openai";

export default defineEventHandler(async (event) => {
  // const { model, messages } = await readBody(event)
  const config = useRuntimeConfig(event)
  const openai = new OpenAI({
    apiKey: config.openaiKey,
  });
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What are in these images? Is there any difference between them?" },
          {
            type: "image_url",
            image_url: {
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
            },
          },
          {
            type: "image_url",
            image_url: {
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
            },
          }
        ],
      },
    ],
  });
  console.log(response.choices[0]);
  return response.choices[0]
 }) 