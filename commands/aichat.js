const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("aichat")
    .setDescription("converse com a Mary Jana")
    .addStringOption((option) =>
      option.setName("prompt").setDescription("prompt").setRequired(true)
    ),

  async execute(interaction, client) {
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    await interaction.deferReply(`\`${"..."}\``);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: interaction.options.getString("prompt"),
      max_tokens: 1000,
      temperature: 0,
    });

    if (response.data.choices[0].text.length < 1024) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setDescription(interaction.options.getString("prompt"))
        .addFields({
          name: "Resposta:",
          value: `${response.data.choices[0].text}`,
          inline: true,
        })
        .setColor("#008000");
      interaction.editReply({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setDescription(interaction.options.getString("prompt"))
        .addFields({
          name: "Resposta:",
          value: `Desculpe, infelizmente essa resposta é muito grande para os padrões do Discord.`,
          inline: true,
        })
        .setColor("#FF4500");
      interaction.editReply({ embeds: [embed] });
    }
  },
};
