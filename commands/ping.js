const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Veja sua conexão em tempo real"),
  async execute(interaction, client) {
    const user = interaction.user;
    const ping = client.ws.ping;

    const pingBom = new EmbedBuilder()
      .setDescription(`${user}, seu ping está em: \`${ping}ms.\`\n Tá melhor que muito nego aí! `)
      .setColor("#00FF00");

    const pingMedio = new EmbedBuilder()
      .setDescription(`${user}, seu ping está em: \`${ping}ms\`\n`)
      .setColor("#ADFF2F");

    const pingRuim = new EmbedBuilder()
      .setDescription(`${user}, seu ping está em: \`${ping}ms\`\n Acho é pouco! `)
      .setColor("#FF4500");

    await interaction.reply({
      embeds: [ping < 100 ? pingBom : ping < 200 ? pingMedio : pingRuim],
    });
  },
};
