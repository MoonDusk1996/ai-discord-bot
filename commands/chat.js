// imports
const fetchOpenai = require("../services/fetchOpenai");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { sucessLog, errorLog } = require("../services/sendLogs");

//command config
module.exports = {
  data: new SlashCommandBuilder()
    .setName("chat")
    .setDescription("converse com a Mary Jane")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("prompt")
        .setRequired(true)
        .setMaxLength(500)
    ),

  //command action
  async execute(interaction, client) {
    await interaction.deferReply();
    const commandName = interaction.commandName;
    const user = interaction.user;
    const prompt = interaction.options.getString("prompt");
    const model = "text-davinci-003";

    await fetchOpenai(model, prompt)
      .then((response) => {
        const embed = new EmbedBuilder()
          .setAuthor({
            name: user.username,
            iconURL: user.displayAvatarURL(),
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
        sucessLog(client, user, commandName, prompt, response);
      })
      .catch((error) => {
        const embed = new EmbedBuilder()
          .setAuthor({
            name: user.username,
            iconURL: user.displayAvatarURL(),
          })
          .setDescription(prompt)
          .addFields({
            name: "Resposta:",
            value:
              "Desculpe, a resposta é grande demais ou muito poderosa, infelizmente ainda não  vou consiguir responder isso no momento.",
            inline: false,
          })
          .setColor("#FF4500");
        interaction.editReply({
          embeds: [embed],
        });
        errorLog(client, user, commandName, prompt, error);
      });
  },
};
