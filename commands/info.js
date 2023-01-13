const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Veja informações de um usuário")
    .addUserOption((option) =>
      option.setName("user").setDescription("Usuário").setRequired(true)
    ),

  async execute(interaction, client) {
    const user = interaction.options.getUser("user");

    const embed = new EmbedBuilder()
      .setThumbnail(user.displayAvatarURL())
      .setColor("#008000")
      .addFields(
        {
          name: "Usuário:",
          value: `\`${user.username}#${user.discriminator}\``,
          inline: true,
        },
        {
          name: "É um bot?",
          value: `\`${user.bot === true ? "Sim" : "Não"}\``,
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
        .setLabel("Abrir avatar no navegador")
        .setStyle(ButtonStyle.Link)
    );

    await interaction
      .reply({
        embeds: [embed],
        components: [showAvatarBtn],
      })
      .then(() => {
        setTimeout(() => {}, 4000);
      });
  },
};
