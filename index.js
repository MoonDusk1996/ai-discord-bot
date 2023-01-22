//imports
const dotenv = require("dotenv");
dotenv.config();

const { Events, ActivityType } = require("discord.js");
const { client } = require("./configs/discordConfigs");
const dmChatSpan = require("./templates/dm/noPremiumUser.json");
const fetchDb = require("./services/fetchDb");
const PremiumGuildFunctions = require("./utils/PremiumGuildFunctions");

const status = "o Brasil no hard";

let specialUsersRoles;
let logsChanel;
let premiumGuild;
let officialGuild;
let donorUserIds;

//===========================once on start==============================//
client.once(Events.ClientReady, async () => {
  officialGuild = client.guilds.cache.get("866109574905069608");
  premiumGuild = client.guilds.cache.get("363504194453241866");
  logsChanel = client.channels.cache.get("1063274423391621130");
  specialUsersRoles = officialGuild.roles.cache.get("1064834781315088444");
  donorUserIds = await fetchDb().then((data) => data.donorUserIds);

  officialGuild.members.fetch().then((users) =>
    users.map((item) => {
      if (donorUserIds.includes(item.id)) {
        item.roles.add(specialUsersRoles);
        console.log("donaters role has added ✅");
      }
    })
  );

  client.user.setActivity(status, { type: ActivityType.Playing });
  console.log(
    `${client.presence.status} em ${client.guilds.cache.size} servidores! ⚡`
  );
});

//=========== when a new member enter in the official guild============//
client.on(Events.GuildMemberAdd, async (member) => {
  if (member.guild == officialGuild) {
    donorUserIds = await fetchDb().then((data) => data.donorUserIds);
    officialGuild.members.fetch().then((users) =>
      users.map((item) => {
        if (donorUserIds.includes(item.id)) {
          item.roles.add(specialUsersRoles);
          console.log("donaters role has added ✅");
        }
      })
    );
  }
});

//======================when interaction commands=====================//
client.on(Events.InteractionCreate, (interaction) => {
  const command = client.commands.get(interaction.commandName);
  switch (
    interaction.channel //avaliate channel
  ) {
    case null: //dm channel
      if (donorUserIds.includes(interaction.user.id)) {
        command.execute(interaction, logsChanel, client);
      } else {
        interaction.reply(dmChatSpan);
      }
      break;
    default: //all guid channel
      command.execute(interaction, logsChanel, client);
      break;
  }
});

//===============when a message is sent in some guild================//
client.on(Events.MessageCreate, (message) => {
  if (message.guild == premiumGuild) {
    PremiumGuildFunctions(message, client);
  }
});

client.login(process.env.DISCORD_TOKEN);
