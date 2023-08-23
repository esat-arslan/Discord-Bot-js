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
    ButtonStyle,
    ActivityType
}
     = require('discord.js');
     //intent=what can the bot can read
const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})
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
let status = [
    {
        name: "Mmmm",
        type: ActivityType.Streaming,
        url: `https://www.twitch.tv/lck`
    },
    {
        name: "Mmmm",
        type: ActivityType.Watching,
        url: `https://www.twitch.tv/lck`
    },
    {
        name: "Mmmm",
        type: ActivityType.Listening,
    },
    {
        name: "Not Mmmm",
        type: ActivityType.Playing
    }
]
//when bot is running
client.once('ready',async()=>{
    console.log(`${client.user.tag} is online.`);
    //custom status:
    setInterval(() =>{
        let random = Math.floor(Math.random()*status.length);
        client.user.setActivity(status[random]);
    })
      //create roles adder buttons
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
// log the message when typed
//message content can have lots of properties like author, guild..
client.on('messageCreate', (message)=>{
    console.log(message.content);
    if(message.author.bot){
        return;
    }
    if(message.content==='hello'){
        message.reply('ve aleykum hello');
    }
    if(message.content === 'hey'){
        message.reply('yeap');
    }
    if(message.content === 'embed'){
        const embed = new EmbedBuilder().setTitle("Embed title")
        .setDescription("This is the Descriptio")
        .setColor('Random').setURL('https://discord.js.org/')
        .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields({name: 'Feild title',value:'this is the value',inline: true},
        {
            name:'2nd Field title', value:'second field value',inline:true
        })
        .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
        .setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
        ;
        message.channel.send({embeds:[embed]});  
    }       
})
//add or remove rules from buttons
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
client.on('interactionCreate',(interaction)=>{
    if(!interaction.isChatInputCommand())return;
    console.log(interaction.commandName);
    if(interaction.commandName === 'hey'){
        interaction.reply('nope');
    }
    if(interaction.commandName === 'ping'){
        interaction.reply('Pong');
    }
    if(interaction.commandName === 'add'){
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;
        interaction.reply(`The sum is ${num1+num2}`);
    }
    if(interaction.commandName === 'embed'){
        const embed = new EmbedBuilder().setTitle("Embed title")
        .setDescription("This is the Descriptio")
        .setColor('Random').setURL('https://discord.js.org/')
        .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields({name: 'Feild title',value:'this is the value',inline: true},
        {
            name:'2nd Field title', value:'second field value',inline:true
        })
        .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
        .setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
        ;
        interaction.reply({embeds:[embed]});     
    }
});

//bot passwd
client.login(process.env.TOKEN);
