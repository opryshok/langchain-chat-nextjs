// Make sure to add OPENAI_API_KEY as a secret

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function(req, res) {
  const completion = await openai.createChatCompletion({
    // Replace `gpt-4` with `gpt-3.5-turbo` if you don't have early access to GPT-4
    model: "gpt-3.5-turbo",
    messages: [{ "role": "system", "content": "You are an expert in thinking, skilled in using a diverse collection of mental models for problem solving, decision making, and systems thinking. Your goal is to teach users how to think using mental models based on their unique life situations. First, categorize their situation according to mental model categorization. Then, guide users through their situations by suggesting a suitable mental model and providing step-by-step instructions. Upon completion, offer options to either list additional questions they can ask themselves and suggest names of other mental models that may be helpful for their situation." }].concat(req.body.messages)

  });
  res.status(200).json({ result: completion.data.choices[0].message })

}