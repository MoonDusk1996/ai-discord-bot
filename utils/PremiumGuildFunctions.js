const rollDice = require("./rngRoll")
const openai = require("../controller/fetchOpenai")

async function PremiumGuildFunctions(message, client) {
	const messagedata = message.content.toLowerCase()
	const emojiReactEspecificKeywordChance = 15
	const criticalRandonEmojiChance = 1
	const customEmojiList = client.emojis.cache.map((e) => {
		return `${e}`
	})

	//função de perguntar o que o bot acha
	if (message.content.includes(`<@${process.env.DISCORD_APP_ID}>`)) {
		if (message.reference) {
			const replyto = await message.channel.messages.fetch(
				message.reference.messageId
			)
			const messageReference = await replyto.content.replace(
				`<@${process.env.DISCORD_APP_ID}>`,
				""
			)

			const prompt = `${message.content}: "${messageReference}"`.replace(
				`<@${process.env.DISCORD_APP_ID}>`,
				""
			)
			const response = await openai(prompt, 1000)
			console.log(response)
			message.reply(response)
		}
	}

	//critial random custom emoji
	if (rollDice(criticalRandonEmojiChance)) {
		message.react(
			customEmojiList[Math.floor(Math.random() * customEmojiList.length)]
		)
	}

	//react emoji in especific keywords
	if (rollDice(emojiReactEspecificKeywordChance)) {
		if (
			messagedata.includes("corno") ||
			messagedata.includes("cornos") ||
			messagedata.includes("boi") ||
			messagedata.includes("gado") ||
			messagedata.includes("vaca") ||
			messagedata.includes("chifre") ||
			messagedata.includes("chifrudo") ||
			messagedata.includes("chifrou") ||
			messagedata.includes("traiu")
		) {
			message.react("<:gado:474085129061662721>") //gado emoji
		}
		if (
			messagedata.includes("lol") ||
			messagedata.includes("lolzinho") ||
			messagedata.includes("vava") ||
			messagedata.includes("<@&1016783676526301346>")
		) {
			message.react("🏳️‍🌈") //gay flag emoji
		}
		if (
			messagedata.includes("travesti") ||
			messagedata.includes("ancap") ||
			messagedata.includes("caneta") ||
			messagedata.includes("ateu")
		) {
			message.react("<:3x4:416104479176392707>") //caneta emoji
		}
		if (
			messagedata.includes("seven") ||
			messagedata.includes("frango") ||
			messagedata.includes("galinha") ||
			messagedata.includes("frangos")
		) {
			message.react("<:Seven:364212708352196618>>") // seven emoji
		}
	}
}
module.exports = PremiumGuildFunctions
