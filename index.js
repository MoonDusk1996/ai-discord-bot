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
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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
    client.user.setActivity("o Brasil no hard", { type: ActivityType.Playing });
  });
  
  client.on(Events.InteractionCreate, async (interaction) => {
  const notification = client.channels.cache.get(process.env.CHANNEL_NOTIFICATION_ID);
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
