const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hentai")
    .setDescription("post a image hentai")
    .addStringOption((option) =>
      option
        .setName("tag")
        .setDescription("hentai tag")
        .setRequired(true)
        .addChoices(
          { name: "ass", value: "ass" },
          { name: "milf", value: "milf" },
          { name: "oral", value: "oral" },
          { name: "paizuri", value: "paizuri" },
          { name: "ecchi", value: "ecchi" },
          { name: "ero", value: "ero" }
        )
    ),

  async execute(interaction, client, notification) {
    const tag = interaction.options.getString("tag");
    const gif = interaction.options.getString("gif") ?? false;

    const response = await fetch(
      `https://api.waifu.im/search/?included_tags=${tag}`
    );
    const data = await response.json();

    const embed = new EmbedBuilder()
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setImage(data.images[0].url)
      .setColor(data.images[0].dominant_color);

    await interaction.reply({
      embeds: [embed],
    });
    await notification.send({ embeds: [embed] });
  },
};
