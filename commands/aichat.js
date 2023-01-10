// imports
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

//command config
module.exports = {
  data: new SlashCommandBuilder()
    .setName("aichat")
    .setDescription("converse com a Mary Jana")
    .addStringOption((option) =>
      option.setName("prompt").setDescription("prompt").setRequired(true)
    ),

  //command action
  async execute(interaction, client) {
    await interaction.deferReply();

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: interaction.options.getString("prompt"),
      max_tokens: 1000,
      temperature: 0,
    });

    //trataments
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
          value: `Desculpe, infelizmente essa resposta é muito grande para os padrões do Discord, mas em breve estarei com o meu sistema de paginas 100% funcional`,
          inline: true,
        })
        .setColor("#FF4500");
      const navigateButtons = new ActionRowBuilder().addComponents([
        new ButtonBuilder()
          .setCustomId("prev")
          .setEmoji("⬅️")
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId("next")
          .setEmoji("➡️")
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true),
      ]);

      interaction.editReply({ embeds: [embed], components: [navigateButtons] });
    }
  },
};
