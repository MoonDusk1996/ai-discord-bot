//imports
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
dotenv.config();
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
const dmChatSpan = require("./templates/dm/noPremiumUser.json");
const updateDonatersRole = require("./modules/updateDonatersRole");
const PremiumGuildFunctions = require("./modules/PremiumGuildFunctions");

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

//===========================once on start==============================//
client.once(Events.ClientReady, async () => {
  client.user.setActivity("o Brasil", { type: ActivityType.Playing });
  console.log(
    `${client.user.username} está ${client.presence.status} em ${client.guilds.cache.size} servidores no discord! ⚡`
  );
});

//=============================ever on=================================//
client.on(Events.ClientReady, async () => {
  updateDonatersRole(client);
});

//=========== when a new member enter in the official guild===========//
client.on(Events.GuildMemberAdd, (member) => {
  if (member.guild.id === process.env.OFFICIAL_GUILD_ID) {
    console.log(` a new member has entred in the ${member.guild.name} ➕`);
    updateDonatersRole(client);
  }
});

//=====================when interaction commands=======================//
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
//==============when a message is sent in some guild================//
client.on(Events.MessageCreate, async (message) => {
  if (message.guild == process.env.PREMIUM_GUILD) {
    PremiumGuildFunctions(message);
  }
});

client.login(process.env.DISCORD_TOKEN);
