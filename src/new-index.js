require('dotenv').config();
const { Client, Intents, MessageActionRow, MessageButton, ActivityType, MessageEmbed, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

const roles = [
    { id: '1138377490218360873', label: 'Red' },
    { id: '1138377589275230318', label: 'Blue' },
    { id: '1138377630488465428', label: 'Yellow' }
];

const status = [
    { name: "Mmmm", type: 'STREAMING', url: 'https://www.twitch.tv/lck' },
    { name: "Mmmm", type: 'WATCHING', url: 'https://www.twitch.tv/lck' },
    { name: "Mmmm", type: 'LISTENING' },
    { name: "Not Mmmm", type: 'PLAYING' }
];

// Create roles adder buttons on ready
client.once('ready', async () => {
    try {
        const channel = await client.channels.cache.get('1138150391540891658');
        if (!channel) return;

        const buttons = roles.map(role =>
            new MessageButton()
                .setCustomId(role.id)
                .setLabel(role.label)
                .setStyle('PRIMARY')
        );

        const row = new MessageActionRow().addComponents(buttons);

        await channel.send({
            content: 'Claim or remove roles',
            components: [row]
        });

        console.log(`${client.user.tag} is online.`);
        // Set custom status
        setInterval(() => {
            const random = Math.floor(Math.random() * status.length);
            client.user.setActivity(status[random]);
        }, 60000); // Set custom status every 60 seconds

    } catch (error) {
        console.error(error);
    }
});

// Listen for message events
client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();
    switch (content) {
        case 'hello':
            message.reply('ve aleykum hello');
            break;
        case 'hey':
            message.reply('yeap');
            break;
        case 'embed':
            const embed = new MessageEmbed()
                .setTitle("Embed title")
                .setDescription("This is the Description")
                .setColor('RANDOM')
                .setURL('https://discord.js.org/')
                .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                .addFields(
                    { name: 'Field title', value: 'This is the value', inline: true },
                    { name: '2nd Field title', value: 'Second field value', inline: true },
                    { name: 'Inline field title', value: 'Some value here', inline: true }
                )
                .setImage('https://i.imgur.com/AfFp7pu.png')
                .setTimestamp()
                .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

            message.channel.send({ embeds: [embed] });
            break;
    }
});

// Listen for interaction events
client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        try {
            await interaction.deferReply({ ephemeral: true });
            const role = interaction.guild.roles.cache.get(interaction.customId);
            if (!role) {
                return interaction.editReply({ content: "I couldn't find that role." });
            }

            const member = interaction.member;

            if (member.roles.cache.has(role.id)) {
                await member.roles.remove(role);
                await interaction.editReply(`The role ${role} has been removed.`);
            } else {
                await member.roles.add(role);
                await interaction.editReply(`The role ${role} has been added.`);
            }

        } catch (error) {
            console.log(error);
        }
    }

    if (interaction.isCommand()) {
        switch (interaction.commandName) {
            case 'hey':
                interaction.reply('nope');
                break;
            case 'ping':
                interaction.reply('Pong');
                break;
            case 'add':
                const num1 = interaction.options.getInteger('first-number');
                const num2 = interaction.options.getInteger('second-number');
                interaction.reply(`The sum is ${num1 + num2}`);
                break;
            case 'embed':
                const embed = new MessageEmbed()
                    .setTitle("Embed title")
                    .setDescription("This is the Description")
                    .setColor('RANDOM')
                    .setURL('https://discord.js.org/')
                    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                    .addFields(
                        { name: 'Field title', value: 'This is the value', inline: true },
                        { name: '2nd Field title', value: 'Second field value', inline: true },
                        { name: 'Inline field title', value: 'Some value here', inline: true }
                    )
                    .setImage('https://i.imgur.com/AfFp7pu.png')
                    .setTimestamp()
                    .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

                interaction.reply({ embeds: [embed] });
                break;
        }
    }
});

client.login(process.env.TOKEN);
