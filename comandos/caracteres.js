const Discord = require('discord.js');

module.exports = {
  nombre: 'characters',
  alias: ['caracteres', 'c'],
  descripcion: 'hola',
  tipo: 'Test',
  uso: 'prueba',

  async run({client, message, args}) {
    if(!message.reference) return message.reply(`Error! Debes citar un mensaje ☝️🤓 ||///||`);
    const msg = await message.channel.messages.fetch(message.reference.messageId);
    let algo = msg.content.split('[jump](<https://discord.com/channels/@me')
    if(algo.length > 1){
      algo[1] = algo[1].slice(41)
      msg.content = algo[1]
    }
    message.reply(`El mensaje citado tiene ${msg.content.length} caracteres. ||///||`);
  }
}
