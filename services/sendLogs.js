const { EmbedBuilder } = require("discord.js")

module.exports = async function sendLogs(client, interaction, embed) {
	console.log(
		"Interaction Guild: " + JSON.stringify(interaction.guild, null, 2)
	)
	console.log("Interaction User: " + JSON.stringify(interaction.user, null, 2))

	const logChanel = client.channels.cache.get("1063274423391621130")
	const user = {
		id: interaction.user.id,
		name: interaction.user.username,
		bot: interaction.user.bot,
		avatar: interaction.user.avatarURL(),
	}
	const guild = interaction.guild
		? {
				id: interaction.guild.id,
				name: interaction.guild.name,
				icon: interaction.guild.iconURL(),
		  }
		: null

	const sucessEmbed = new EmbedBuilder()
		.setTitle(`Comando ${interaction.commandName} executado!`)
		.addFields(
			{
				name: "Usuário:",
				value: JSON.stringify(user, null, 2),
				inline: false,
			},
			{
				name: guild ? "Guild: " : "Comando executado via DM",
				value: guild ? JSON.stringify(guild, null, 2) : " ",
				inline: false,
			}
		)
		.setColor("#6B8E23")

	logChanel.send({ embeds: [sucessEmbed, embed] })
}
