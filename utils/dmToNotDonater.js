const { EmbedBuilder } = require("discord.js");

const embed = new EmbedBuilder()
  .setDescription(
    "Desculpe, comandos diretos só estão disponiveis para doadores. Não fique chateado, você ainda pode executar os comandos no nosso servidor oficial ou se você me adicionar em algum servidor do discord"
  )
  .setColor("#FF4500")
  .setFields(
    {
      name: "Mary Jane - Convite",
      value:
        "https://discord.com/api/oauth2/authorize?client_id=990769238841118740&permissions=2147483648&scope=bot%20applications.commands",
    },
    {
      name: "Mary Jane - Servidor oficial",
      value: "https://discord.gg/AGfxJKmbKf",
    },
    {
      name: "Seja um doador e ajude o projeto ❤️",
      value: "https://mary-jane-website.vercel.app/",
    }
  );

module.exports = { embed };
