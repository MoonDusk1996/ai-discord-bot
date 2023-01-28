const { ActivityType } = require("discord.js")

module.exports = function setActivity(client) {
	const activity = ActivityType.Listening
	const status = "Lofi Brasileiro"

	client.user.setActivity(status, { type: activity })
}
