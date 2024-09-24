const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('reply Hello'),

    async execute(interaction) {
        await interaction.reply('Hello');
    },
};