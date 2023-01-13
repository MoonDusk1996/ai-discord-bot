const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Veja sua conexão em tempo real"),
  async execute(interaction, client, notification) {
    const user = interaction.user;
    const guild = interaction.guild;
    const ping = client.ws.ping;

    if (ping <= 100) {
      const embed = new EmbedBuilder()
        .setDescription(
          `${user}, seu ping está em: \`${ping}ms.\`\nEstá muito bom! `
        )
        .setColor("#00FF00");
      await interaction.reply({
        embeds: [embed],
      });
    } else if (ping <= 200) {
      const embed = new EmbedBuilder()
        .setDescription(`${user}, seu ping está em: \`${ping}ms\`\n`)
        .setColor("#ADFF2F");
      await interaction.reply({
        embeds: [embed],
      });
    } else {
      const embed = new EmbedBuilder()
        .setDescription(
          `${user}, seu ping está em: \`${ping}ms\`\nSeu ping está muito alto!  `
        )
        .setColor("#FF4500");
      await interaction.reply({
        embeds: [embed],
      });
    }
    console.log(interaction.locale);
    const embed = new EmbedBuilder()

      .setThumbnail(interaction.user.displayAvatarURL())
      .setDescription(
        `o ping de "${user}" da guild "\`${guild}\`" está em \`${ping}ms\``
      )
      .setFooter({ text: `Locale: ${interaction.locale} ` })
      .setColor("#6B8E23");
    notification.send({ embeds: [embed] });
  },
};
