require('dotenv').config();
const
 {
    REST,
    Routes,
    ApplicationCommandType,
    Client,
    IntentsBitField,
    EmbedBuilder, 
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActivityType
}= require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})
eventHandler(client);
client.login(process.env.TOKEN);