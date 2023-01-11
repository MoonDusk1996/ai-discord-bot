const { EmbedBuilder } = require("discord.js");
module.exports = {
  embeds(interaction, response, maxCaracters) {
    const textResponse = response.data.choices[0].text;

    const paginas = Math.floor(textResponse.length / maxCaracters + 1);

    const pagina1 = textResponse.slice(0, maxCaracters);
    const pagina2 = textResponse.slice(maxCaracters, maxCaracters * 2);
    const pagina3 = textResponse.slice(maxCaracters * 2, maxCaracters * 3);

    const allbutons = [
      new EmbedBuilder()
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .addFields({
          name: "Prompt:",
          value: interaction.options.getString("prompt"),
          inline: false,
        })
        .addFields({
          name: "Resposta:",
          value:
            textResponse.length < maxCaracters
              ? pagina1
              : pagina1 + "..." + "\n-",
          inline: false,
        })
        .setFooter(
          textResponse.length < maxCaracters ? null : { text: "Pagina: 1" }
        )
        .setColor("#008000"),
      new EmbedBuilder()
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .addFields({
          name: "Prompt:",
          value: interaction.options.getString("prompt"),
          inline: false,
        })
        .addFields({
          name: "Resposta:",
          value: pagina2 == "" ? "..." : pagina2 + "\n-",
          inline: true,
        })
        .setFooter({ text: "Pagina: 2" })
        .setColor("#008000"),
    ];


    return { allbutons };
  },
};
