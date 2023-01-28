const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const sendLogs = require("../utils/sendLogs")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Veja sua conexão em tempo real"),
	async execute(interaction, client) {
		const user = interaction.user
		const guild = interaction.guild
		const ping = client.ws.ping

		const response = `${user}, sua latência está em: \`${ping}ms.\``

		if (ping <= 50) {
			const embed = new EmbedBuilder()
				.setDescription(response)
				.setColor("1D9F34")
			await interaction.reply({
				embeds: [embed],
			})
		} else if (ping <= 100) {
			const embed = new EmbedBuilder()
				.setDescription(response)
				.setColor("44A11C")
			await interaction.reply({
				embeds: [embed],
			})
		} else if (ping < 150) {
			const embed = new EmbedBuilder()
				.setDescription(response)
				.setColor("A6A519")
			await interaction.reply({
				embeds: [embed],
			})
		} else if (ping < 200) {
			const embed = new EmbedBuilder()
				.setDescription(response)
				.setColor("#B2651B")
			await interaction.reply({
				embeds: [embed],
			})
		} else {
			const embed = new EmbedBuilder()
				.setDescription(response)
				.setColor("#AC1616")
			await interaction.reply({
				embeds: [embed],
			})
		}
		const embed = new EmbedBuilder()
			.setThumbnail(interaction.user.displayAvatarURL())
			.setDescription(
				`o latência de "${user}" da guild "\`${guild}\`" está em \`${ping}ms\``
			)
			.setFooter({ text: `Locale: ${interaction.locale} ` })
			.setColor("#6B8E23")

		sendLogs(client, interaction, embed)
	},
}
