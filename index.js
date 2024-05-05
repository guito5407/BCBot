const Discord = require('discord.js');
const {Client, GatewayIntentBits, Partials, REST, Routes} = Discord;
const client = new Client({
  intents:[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping
  ],
  partials: [
    Partials.GuildMember,
    Partials.User,
    Partials.Message,
    Partials.Channel,
    Partials.Reaction
  ]
});

const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);

const config = require('./config.js');

const fs = require('fs');
const path = require('path');
const keep_alive = require('./keep_alive.js');

var LNM = 0
var LIV = true

client.on("ready", () => {
  console.log("Ando activo papi")
  
  const Lchannel = client.channels.cache.get("1103166487117713558");
function Main(delay) {
  setInterval(()=> {
      if(LIV === true){
         Lchannel.send(`Iniciando el conteo en 10 segundos, el bot acaba de ser encendido. || <@940744356376248320> ||`);
        LIV = false
      } else {        
        LNM += 10
        Lchannel.send(`${LNM} segundos`)
      }
  }, delay)
}
  Main(10000)
});

client.Pcommands = new Discord.Collection();
client.aliases = new Discord.Collection();
const pcommandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of pcommandFiles) {
  const command = require(`./comandos/${file}`)
  client.Pcommands.set(command.nombre, command)
  for (let i = 0; i < command.alias.length; i++) {
    client.aliases.set(command.alias[i], command.nombre);
  }
}

client.on("messageCreate", async (message) => {
  if(message.author.bot) return;
  if(message.guild === null) return; 
  var prefix = "-"

  if(!message.content.startsWith(prefix)) return;

  let args = message.content.slice(prefix.length).trim().split(/ +/g)
 
  let command = args.shift().toLowerCase();


  let cmd = client.Pcommands.get(command);
  if(!cmd) cmd = client.Pcommands.get(client.aliases.get(command));

  if(cmd){
    if(cmd.tipo.toLowerCase() === 'developer'){
      if(!config.developers.includes(message.author.id)) return;
    }
    cmd.run({client, message, args, Discord, config}).catch(error => {
        console.error(error);
        return null;
      });;
  }
  
});

client.login(config.token)
