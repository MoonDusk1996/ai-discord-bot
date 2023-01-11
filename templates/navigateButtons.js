const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const navigateButtons = new ActionRowBuilder().addComponents([
  new ButtonBuilder()
    .setCustomId("prev")
    .setEmoji("⬅️")
    .setStyle(ButtonStyle.Primary),
  new ButtonBuilder()
    .setCustomId("next")
    .setEmoji("➡️")
    .setStyle(ButtonStyle.Primary),
]);
module.exports = navigateButtons;
