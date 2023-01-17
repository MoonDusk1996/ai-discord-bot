//imports
const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  ActivityType,
  EmbedBuilder,
} = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const dmChatSpan = require("./templates/dm/noPremiumUser.json");
const rollDice = require("./services/rollDice");
const openai = require("./services/fetchOpenai");

//discord config
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

//once on start
client.once(Events.ClientReady, () => {
  console.log(
    `${client.user.username} está ${client.presence.status} em ${client.guilds.cache.size} servidores no discord!`
  );
  client.user.setActivity("o Brasil", { type: ActivityType.Playing });
});

//when on
client.on(Events.InteractionCreate, async (interaction) => {
  const notification = client.channels.cache.get(
    process.env.CHANNEL_NOTIFICATION_ID
  );

  const command = client.commands.get(interaction.commandName);
  switch (
    interaction.channel //avaliate channel
  ) {
    case null: //dm channel
      await interaction.reply(dmChatSpan);
      break;
    default: //guid channel
      await command.execute(interaction, client, notification);
      break;
  }
});

//when on premium server
client.on(Events.MessageCreate, async (message) => {
  if (message.guild == process.env.PREMIUM_GUILD) {
    const messagedata = message.content.toLowerCase();
    const percent = 15;

    if (message.content.includes(`<@${process.env.DISCORD_APP_ID}>`)) {
      if (message.reference) {
        const replyto = await message.channel.messages.fetch(
          message.reference.messageId
        );
        const messageReference = replyto.content.replace(
          `<@${process.env.DISCORD_APP_ID}>`,
          ""
        );

        const prompt = `${message.content}: "${messageReference}"`.replace(
          `<@${process.env.DISCORD_APP_ID}>`,
          ""
        );
        const response = await openai(prompt, 1000);
        console.log(response);
        message.reply(response);
      }
    }

    //react emoji
    if (rollDice(percent)) {
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
        message.react("<:gado:474085129061662721>"); //gado emoji
      }
      if (
        messagedata.includes("lol") ||
        messagedata.includes("lolzinho") ||
        messagedata.includes("vava") ||
        messagedata.includes("<@&1016783676526301346>")
      ) {
        message.react("🏳️‍🌈"); //gay flag emoji
      }
      if (
        messagedata.includes("travesti") ||
        messagedata.includes("ancap") ||
        messagedata.includes("caneta") ||
        messagedata.includes("ateu")
      ) {
        message.react("<:3x4:416104479176392707>"); //caneta emoji
      }
      if (
        messagedata.includes("seven") ||
        messagedata.includes("frango") ||
        messagedata.includes("galinha") ||
        messagedata.includes("frangos")
      ) {
        message.react("<:Seven:364212708352196618>>"); // seven emoji
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
