const {Client, GatewayIntentBits} = require('discord.js');
const {token, roleToKick} = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.MessageContent,
  ]
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const {commandName} = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'kick') {
    await interaction.reply('Kicking all members.');
    await interaction.guild.members.fetch();
    const members = interaction.guild.roles.cache.get(roleToKick).members
    members.forEach(member => {
      member.kick()
    })
  }
});

client.login(token);