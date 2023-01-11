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
    const maxCaracters = 1020;

    //see first message
    await interaction.deferReply();

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: interaction.options.getString("prompt"),
      max_tokens: 1020,
      temperature: 0,
    });
    //pagination
    const pagina1 = response.data.choices[0].text.slice(0, maxCaracters);
    const pagina2 = response.data.choices[0].text.slice(
      maxCaracters,
      maxCaracters * 2
    );

    //embeds
    const embed = new EmbedBuilder()
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setDescription(interaction.options.getString("prompt"))
      .addFields({
        name: "Resposta:",
        value:
          response.data.choices[0].text.length < maxCaracters
            ? pagina1
            : pagina1 + "...",
        inline: true,
      })
      .setColor("#008000");

    const embed2 = new EmbedBuilder()
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setDescription(interaction.options.getString("prompt"))
      .addFields({
        name: "Resposta:",
        value: pagina2 == "" ? "..." : pagina2,
        inline: true,
      })
      .setColor("#008000");

    // buttons
    const navigateButtons = new ActionRowBuilder().addComponents([
      new ButtonBuilder()
        .setCustomId("prev")
        .setEmoji("⬅️")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("next")
        .setEmoji("➡️")
        .setStyle(ButtonStyle.Primary),
    ]);
    console.log(navigateButtons)

    //final response
    if (response.data.choices[0].text.length < maxCaracters) {
      interaction.editReply({
        embeds: [embed],
      });
    } else {
      const filter = (i) => i.customId === "next" || i.customId === "prev";
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
      });
      collector.on("collect", async (i) => {
        if (i.customId == "prev") {
          await i.update({
            components: [navigateButtons],
            embeds: [embed],
          });
        }
        if (i.customId == "next") {
          await i.update({
            components: [navigateButtons],
            embeds: [embed2],
          });
        }
      });

      collector.on("end", (collected) => console.log(`end`));

      interaction.editReply({
        embeds: [embed],
        components: [navigateButtons],
      });
    }
  },
};
