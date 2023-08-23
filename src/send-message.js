 //what needs to be imported
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
    ButtonStyle}
     = require('discord.js');
//intent=what can the bot can read
const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});
const roles =[
    {
        id: '1138377490218360873',
        label: 'Red'
    },
    {
        id: '1138377589275230318',
        label: 'Blue'
    },
    {
        id: '1138377630488465428',
        label: 'Yellow'
    }
]
//when bot is running
client.on('ready',async(c)=>{
    try{
        const channel = await client.channels.cache.get('1138150391540891658');
        if(!channel)return;
        const row = new ActionRowBuilder();
        roles.forEach((role)=>{
            row.components.push(
                new ButtonBuilder()
                .setCustomId(role.id)
                .setLabel(role.label)
                .setStyle(ButtonStyle.Primary)
            );
        });
        await channel.send({
            content: 'claim or remove roles',
            components:[row]
        });
    }catch(error){
        console.log(error);
    }
});

client.on('interactionCreate',async(interaction)=>{
    try{
        if(!interaction.isButton())return;
        await interaction.deferReply({ephemeral:true});
        const role = interaction.guild.roles.cache.get(interaction.customId);
        if(!role){
            interaction.editReplyreply({
                content: "I couldnt find that role",
            })
            return;
        }
        const hasRole = interaction.member.roles.cache.has(role.id);
        if(hasRole){
            await interaction.member.roles.remove(role);
            await interaction.editReply(`The role ${role} has been removed.`);
            return;
        }
        await interaction.member.roles.add(role);
        await interaction.editReply(`The role ${role} has been added`);

    }catch(error){
        console.log(error)
    }
})

//bot passwd
client.login(process.env.TOKEN);
