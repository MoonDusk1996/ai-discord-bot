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
const { channel } = require("node:diagnostics_channel");
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
  if (interaction.channel == null) {
    await interaction.reply({
      "content": null,
      "embeds": [
        {
          "description": "Desculpe, querido preciso estar em algum servidor para executar os comandos.\nTente me adicionar em algum servidor do discord através do seguinte link:",
          "color": 10501161,
          "fields": [
            {
              "name": "Mary Jane - Discord bot",
              "value": "https://discord.com/api/oauth2/authorize?client_id=990769238841118740&permissions=2147483648&scope=bot%20applications.commands"
            }
          ],
          "thumbnail": {
            "url": "https://github.com/MoonDusk1996/assets/blob/main/mary-jane-discord-bot/gif.gif?raw=true"
          }
        }
      ],
      "attachments": []
    });
  } else {
    if (!interaction.isButton() && !interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "Desculpe, Alguma coisa deu errada no servidor!",
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
