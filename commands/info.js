const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`info`)
    .setDescription("see details for a specific user")
    .addUserOption((option) =>
      option.setName("user").setDescription("user").setRequired(true)
    ),

  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    const embed = new EmbedBuilder()
      .setThumbnail(user.displayAvatarURL())
      .setColor(user.accentColor ? user.accentColor : "#008000")
      .addFields(
        {
          name: "Global nick:",
          value: `\`${user.username}#${user.discriminator}\``,
          inline: true,
        },
        {
          name: "bot?",
          value: `\`${user.bot ? "Yes" : "No"}\``,
          inline: true,
        },
        {
          name: "ID:",
          value: `\`${user.id}\``,
          inline: false,
        }
      );

    const showAvatarBtn = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setURL(user.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setLabel("Avatar")
        .setStyle(ButtonStyle.Link)
    );

    await interaction.reply({
      embeds: [embed],
      components: [showAvatarBtn],
    });
  },
};
