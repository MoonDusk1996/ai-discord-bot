// imports
const openai = require("../services/openAi");
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
  async execute(interaction, client, notification) {
    await interaction.deferReply();
    const prompt = interaction.options.getString("prompt");
    const maxTokenCharacters = 1024;
    const response = await openai(prompt, maxTokenCharacters);

    if (response.length < maxTokenCharacters) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setDescription(prompt)
        .addFields({
          name: "Resposta:",
          value: response,
          inline: false,
        })
        .setColor("#6B8E23");
      interaction.editReply({
        embeds: [embed],
      });
      notification.send({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setDescription(prompt)
        .addFields({
          name: "Resposta:",
          value:
            "Desculpe, a resposta é grande ou muito poderosa não consigo responder. 🥺",
          inline: false,
        })
        .setColor("#FF4500");
      interaction.editReply({
        embeds: [embed],
      });
      notification.send({ embeds: [embed] });
    }
  },
};
