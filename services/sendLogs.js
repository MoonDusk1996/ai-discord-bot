const { EmbedBuilder } = require("discord.js");

function sucessLog(client, user, commandName, prompt, response) {
  const logChanel = client.channels.cache.get("1063274423391621130");
  const embed = new EmbedBuilder()
    .setDescription(`Sucesso ao tentar executar o comando ${commandName}`)
    .addFields(
      {
        name: "Usuário:",
        value: user.username,
        inline: false,
      },
      {
        name: "Prompt:",
        value: prompt ? prompt : commandName,
        inline: false,
      },
      {
        name: "Resposta:",
        value: response,
        inline: false,
      }
    )
    .setThumbnail(user.displayAvatarURL())
    .setColor("#6B8E23");
  logChanel.send({ embeds: [embed] });
}

function errorLog(client, user, commandName, prompt, response) {
  const logChanel = client.channels.cache.get("1063274423391621130");
  const embed = new EmbedBuilder()
    .setDescription(
      `Ocorreu um erro ao tentar executar o comando ${commandName}, visite os logs para mais informações.`
    )
    .addFields(
      {
        name: "Usuário:",
        value: user.username,
        inline: false,
      },
      {
        name: "prompt:",
        value: prompt,
        inline: false,
      },
      {
        name: "Resposta:",
        value:
          "Desculpe, a resposta é grande demais ou muito poderosa, infelizmente ainda não  vou consiguir responder isso no momento.",
        inline: false,
      }
    )
    .setThumbnail(user.displayAvatarURL())
    .setColor("#FF4500");
  logChanel.send({ embeds: [embed] });
}
module.exports = { errorLog, sucessLog };
