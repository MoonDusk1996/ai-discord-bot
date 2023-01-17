const fs = require("node:fs");
const path = require("node:path");

const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");
const dotenv = require("dotenv");
const dmChatSpan = require("./templates/dm/commands.json");
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

client.once(Events.ClientReady, () => {
  console.log(
    `${client.user.username} está ${client.presence.status} em ${client.guilds.cache.size} servidores no discord!`
  );
  client.user.setActivity("o Brasil", { type: ActivityType.Playing });
});

client.on(Events.MessageCreate, (message) => {
  if (message.guild == "363504194453241866") {
    if (
      message.content.includes("corno") ||
      message.content.includes("boi") ||
      message.content.includes("gado") ||
      message.content.includes("vaca") ||
      message.content.includes("chifre") ||
      message.content.includes("chifrudo") ||
      message.content.includes("chifrou") ||
      message.content.includes("traiu") ||
      message.content.includes("test")
    ) {
      message.react("<:gado:474085129061662721>");
    }
    if (
      message.content.includes("lol") ||
      message.content.includes("lolzinho") ||
      message.content.includes("vava") ||
      message.content.includes("gay") ||
      message.content.includes("viado") ||
      message.content.includes("bixa") ||
      message.content.includes("<@&1016783676526301346>")
    ) {
      message.react("🏳️‍🌈");
    }
  }
});

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

client.login(process.env.DISCORD_TOKEN);
