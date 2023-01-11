// imports
const navigateButtons = require("../templates/navigateButtons");
const { embeds } = require("../templates/pageEmbeds");

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const { SlashCommandBuilder } = require("discord.js");

//command config
module.exports = {
  data: new SlashCommandBuilder()
    .setName("aichat")
    .setDescription("converse com a Mary Jane")
    .addStringOption((option) =>
      option.setName("prompt").setDescription("prompt").setRequired(true)
    ),

  //command action
  async execute(interaction) {
    const maxCaracters = 1000;

    //see first message
    await interaction.deferReply();

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: interaction.options.getString("prompt"),
      max_tokens: maxCaracters,
      temperature: 0,
    });

    //final response
    if (response.data.choices[0].text.length < maxCaracters) {
      interaction.editReply({
        embeds: [embeds(interaction, response, maxCaracters).allbutons[0]],
      });
    } else {
      const filter = (i) => i.customId === "next" || i.customId === "prev";
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
      });
      collector.on("collect", async (i) => {
        if (i.customId == "prev") {
          await i.update({
            components: [navigateButtons],
            embeds: [embeds(interaction, response, maxCaracters).allbutons[0]],
          });
        }
        if (i.customId == "next") {
          await i.update({
            components: [navigateButtons],
            embeds: [embeds(interaction, response, maxCaracters).allbutons[1]],
          });
        }
      });

      collector.on("end", (collected) => console.log(`end`));

      interaction.editReply({
        embeds: [embeds(interaction, response, maxCaracters).allbutons[0]],
        components: [navigateButtons],
      });
    }
  },
};
