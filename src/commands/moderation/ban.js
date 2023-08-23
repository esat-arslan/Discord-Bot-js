const {ApplicationCommandOptionType,PermissionFlagsBits} = require('discord.js');
module.exports = {
    deleted: true,
    name: 'ban',
    description: 'Bans a member!!!',
    //devOnly: Boolean
    //testOnly: Boolean,
    options: [
        {
            name: 'target-user',
            description: 'the user to ban',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'the reason for banning',
            required: false,
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],

    callBack: (client, interaction) => {
        interaction.reply(`ban`);
    },
};