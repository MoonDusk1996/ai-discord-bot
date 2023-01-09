const dotenv = require("dotenv");
dotenv.config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

handleStart();
async function handleStart() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `diga que isso é um teste`,
    max_tokens: 100,
    temperature: 0,
  });
  console.log(response.data.choices[0].text);
}
