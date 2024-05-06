const Discord = require('discord.js');

module.exports = {
  nombre: 'tres',
  alias: ['t'],
  descripcion: 'hola',
  tipo: 'Test',
  uso: 'prueba',

  async run({client, message, args}) {
    function error(){
      message.reply(`Error! Debes poner el valor en números <:grrr:1236835649148026900> ||///||`)
    }
    let nms = args;
    if(!nms || nms.length < 2) return error();
    
    if(isNaN(nms[0]) || isNaN(nms[1])) return error();

    var v1 = nms[0]*1, v2 = nms[1]*1;
    let puntos = 100-((v1*100)/v2)

    message.reply(`La diferencia de stats es de ${Math.round(puntos)}||(${puntos})||% ||///||`)
  }
}
