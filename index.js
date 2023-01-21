//imports
const dotenv = require("dotenv");
dotenv.config();

const { Events, ActivityType } = require("discord.js");
const { client } = require("./configs/discordConfigs");
const dmChatSpan = require("./templates/dm/noPremiumUser.json");
const updateDonatersRole = require("./modules/updateDonatersRole");
const PremiumGuildFunctions = require("./modules/PremiumGuildFunctions");

const premiumGuildId = process.env.PREMIUM_GUILD;
const officialGuildId = "866109574905069608";

//===========================once on start==============================//
client.once(Events.ClientReady, () => {
  client.user.setActivity("o Brasil", { type: ActivityType.Playing });
  console.log(
    `${client.user.username} está ${client.presence.status} em ${client.guilds.cache.size} servidores no discord! ⚡`
  );
});

//=============================ever on==================================//
client.on(Events.ClientReady, () => {
  updateDonatersRole(client);
});

//=========== when a new member enter in the official guild============//
client.on(Events.GuildMemberAdd, (member) => {
  if (member.guild.id === officialGuildId) {
    console.log(` a new member has entred in the ${member.guild.name} ➕`);
    updateDonatersRole(client);
  }
});

//======================when interaction commands=====================//
client.on(Events.InteractionCreate, (interaction) => {
  const command = client.commands.get(interaction.commandName);
  switch (
    interaction.channel //avaliate channel
  ) {
    case null: //dm channel
      interaction.reply(dmChatSpan);
      break;
    default: //all guid channel
      command.execute(interaction, client);
      break;
  }
});

//===============when a message is sent in some guild================//
client.on(Events.MessageCreate, (message) => {
  if (message.guild == premiumGuildId) {
    PremiumGuildFunctions(message, client);
  }
});

client.login(process.env.DISCORD_TOKEN);
