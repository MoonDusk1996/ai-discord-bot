// imports
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

//command config
module.exports = {
  data: new SlashCommandBuilder()
    .setName("aichat")
    .setDescription("converse com a Mary Jane")
    .addStringOption((option) =>
      option.setName("prompt").setDescription("prompt").setRequired(true)
    ),

  //command action
  async execute(interaction) {
    const maxCaracters = 1000;

    //see first message
    await interaction.deferReply();

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: interaction.options.getString("prompt"),
      max_tokens: maxCaracters,
      temperature: 0,
    });

    console.log(response.data.choices[0].text.length);
    //final response

    if (response.data.choices[0].text.length < maxCaracters) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setDescription(interaction.options.getString("prompt"))
        .addFields({
          name: "Resposta:",
          value: response.data.choices[0].text,
          inline: false,
        })
        .setColor("#6B8E23");
      interaction.editReply({
        embeds: [embed],
      });
    } else {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setDescription(interaction.options.getString("prompt"))
        .addFields({
          name: "Resposta:",
          value: "Desculpe, a resposta é grande ou muito poderosa não consigo responder. 🥺",
          inline: false,
        })
        .setColor("#FF4500");
      interaction.editReply({
        embeds: [embed],
      });
    }
  },
};
