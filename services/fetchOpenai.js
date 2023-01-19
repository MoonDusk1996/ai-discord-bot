const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const response = (prompt, maxTokenCharacters) => {
  if (prompt.length < maxTokenCharacters) {
    const data = openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: maxTokenCharacters,
        temperature: 0,
      })
      .then((data) => {
        return data.data.choices[0].text;
      });
    return data;
  }
  return "Desculpe, a resposta é grande ou muito poderosa, infelizmente ainda não consigo responder isso. 😞";
};

module.exports = response;
