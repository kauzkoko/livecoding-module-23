import { OpenAI } from "openai";

export default defineEventHandler(async (event) => {
  const { model, messages } = await readBody(event);
  const config = useRuntimeConfig(event);
  const openai = new OpenAI({
    apiKey: config.openaiKey,
  });
  const completion = await openai.chat.completions.create({
    messages: messages ?? [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Hoi weli sprach redi?" },
    ],
    model: model ?? "gpt-4-1106-preview",
  });
  console.log(completion.choices[0]);
  return completion.choices[0].message.content;
});
