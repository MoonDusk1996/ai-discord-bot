const { EmbedBuilder } = require("discord.js")

module.exports = async function sendLogs(client, interaction, embed) {
	// create template object
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
	const logsEmbed = new EmbedBuilder()
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

	//switch channel to send logs
	let logChanel
	switch (
		interaction.commandName //avaliate command name
	) {
		case "chat": //set logs channel
			logChanel = client.channels.cache.get("1063274423391621130")
			break
		case "info": //set info channel
			logChanel = client.channels.cache.get("1068895904733614130")
			break
		case "ping": //set ping channel
			logChanel = client.channels.cache.get("1068895398376255509")
			break
	}

	//send logs to channel
	logChanel.send({ embeds: [logsEmbed, embed] })

	// console logs
	console.log(
		"Interaction Guild: " + JSON.stringify(interaction.guild, null, 2)
	)
	console.log("Interaction User: " + JSON.stringify(interaction.user, null, 2))
}
