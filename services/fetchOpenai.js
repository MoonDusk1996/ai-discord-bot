const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

module.exports = function fetchOpenai(model, prompt) {
  return new Promise((resolve, reject) => {
    openai
      .createCompletion({
        model: model,
        prompt: prompt,
        max_tokens: 1000,
        temperature: 1,
      })
      .then((data) => {
        resolve(data.data.choices[0].text);
      })
      .catch((error) => {
        console.log(error)
        reject(error);
      });
  });
};
