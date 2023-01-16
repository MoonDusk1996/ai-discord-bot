const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hentai")
    .setDescription("post a image hentai")

    .addStringOption((option) =>
      option
        .setName("tag")
        .setDescription("Hentai tag")
        .setRequired(false)
        .addChoices(
          { name: "Ass", value: "ass" },
          { name: "Milf", value: "milf" },
          { name: "Oral", value: "oral" },
          { name: "Paizuri", value: "paizuri" },
          { name: "Ecchi", value: "ecchi" },
          { name: "Ero", value: "ero" }
        )
    )
    .addBooleanOption((option) =>
      option.setName("gif").setDescription("return a gif")
    ),

  async execute(interaction, client, notification) {
    const tag = interaction.options.getString("tag") ?? "hentai";
    const gif = interaction.options.getBoolean("gif") ?? false;

    const response = await fetch(
      `https://api.waifu.im/search/?included_tags=${tag}&gif=${gif}`
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
