const Discord = require('discord.js');

const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
    partials: [
        Partials.GuildMember,
        Partials.User,
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
    ]
});

const config = require('./utiles/config');
const fs = require('node:fs');
const path = require('path');

client.on("ready", () => {
    console.log(`¡Bot encendido!`);

    const Lchannel = client.channels.cache.get("1103166487117713558");
    var LNM = 0

    function Main(delay) {
        setInterval(() => {
            LNM += 10;
            const tiempoTranscurrido = LNM;
            const dias = Math.floor(tiempoTranscurrido / (60 * 60 * 24));
            const horas = Math.floor((tiempoTranscurrido % (60 * 60 * 24)) / (60 * 60));
            const minutos = Math.floor((tiempoTranscurrido % (60 * 60)) / 60);
            const segundos = tiempoTranscurrido % 60;
            let mensaje = '';
            if (dias > 0) mensaje += `${dias} día${dias !== 1 ? 's' : ''}, `;
            if (horas > 0 || dias > 0) mensaje += `${horas} hora${horas !== 1 ? 's' : ''}, `;
            if (minutos > 0 || horas > 0 || dias > 0) mensaje += `${minutos} minuto${minutos !== 1 ? 's' : ''}, `;
            if (segundos > 0 || horas > 0 || dias > 0 || minutos > 0) mensaje += `${segundos} segundo${segundos !== 1 ? 's' : ''}`;
            Lchannel.send(mensaje);
        }, delay);
    }
    Lchannel.send(`Iniciando el conteo, el bot acaba de ser encendido. || < @940744356376248320> ||`);
    Main(10000);
});

client.commands = new Discord.Collection(), client.aliases = new Discord.Collection()
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./comandos/${file}`);
    client.commands.set(command.nombre.toLowerCase(), command);
    for (let i = 0; i < command.alias.length; i++) {
        client.aliases.set(command.alias[i].toLowerCase(), command.nombre.toLowerCase());
    }
}

const predefinedWebhooks = config.webhooks;
class Webhook {
    constructor(index, channel) {
        const webhookData = predefinedWebhooks[index];
        if (!webhookData) throw new Error('Webhook index out of range');
        this.webhookName = webhookData.name;
        this.webhookAvatar = webhookData.avatar;
        this.channel = channel;
    }

    static async getOrCreateWebhook(channel) {
        // Intentar obtener un webhook existente del canal
        const webhooks = await channel.fetchWebhooks();
        let webhook = webhooks.find(wh => wh.owner.id === client.user.id);

        // Si no existe, crear uno nuevo
        if (!webhook) {
            webhook = await channel.createWebhook({
                name: 'BotWebhook',
                avatar: 'https://images-ext-1.discordapp.net/external/WBR50qbTtHdxy5eSqljEzdracR6K8D7fbglVHxEUZsw/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/1184965901582348310/a7bf4f67c9f07c608e0ec7ff316f0359.png?format=webp&quality=lossless',
            });
        }

        return webhook;
    }

    async send(content) {
        const webhook = await Webhook.getOrCreateWebhook(this.channel);
        await webhook.edit({
            name: this.webhookName,
            avatar: this.webhookAvatar,
        });

        return await webhook.send(content);
    }

    async reply(message, content) {
        const webhook = await Webhook.getOrCreateWebhook(this.channel);

        await webhook.edit({
            name: this.webhookName,
            avatar: this.webhookAvatar,
        });

        await webhook.send({
            content: content,
            threadId: message.channel.id,
            // El ID del canal en caso de que sea necesario
        });
    }

    async edit(newContent, message) {
        const webhook = await Webhook.getOrCreateWebhook(this.channel);
        if (message.webhookId === webhook.id) {
            await webhook.editMessage(message.id, newContent);
        } else {
            throw new Error('The message was not sent by this webhook.');
        }
    }
}

client.on("messageCreate", async (message) => {
    if (
        message.author.id === '940744356376248320' &&
        message.content.startsWith('-') &&
        message.guild === null) {
        let args = message.content.trim().split(/ +/g);
        const cmd = args.shift().slice(1).toLowerCase();
        if (cmd === 'soso') {
            if (args.length < 1) return;
            let user = await client.users.fetch(args[0]).catch(() => {
                return null;
            });
            if (!user) message.channel.send('La ID es incorrecta, no he encontrado al usuario.')
            if (args[1] && args[1] !== '-' && (isNaN(args[1]) || args[1] > 3 || args[1] < 0)) return message.channel.send('El segundo argumento debe ser un número y ese número estar dentro del margen de 0 a 3')
            let repetidos = config.soso.filter(e => e.id === user.id);
            if (repetidos.length > 0) {
                if (!args[1]) return message.channel.send(`El valor de \`${user.username}\` en soso es ${repetidos[0].val}`)
                if (args[1] === '-') {
                    const index = config.soso.findIndex(element => element.id === user.id);
                    config.soso.splice(index, 1);
                    return message.channel.send(`Se ha eliminado a \`${user.username}\` de soso`)
                } else {
                    repetidos[0].val = args[1]
                }
            } else {
                if (!args[1]) return message.channel.send(`No hay registro de \`${user.username}\` en soso`)
                if (args[1] === '-') return message.channel.send('No puedes eliminar a este usuario de soso porque no está dentro.')
                config.soso.push({ id: args[0], val: args[1] })
            }
            message.channel.send(`Se ha ${repetidos.length > 0 ? 'editado' : 'guardado'} a \`${user.username}\` en soso con el valor de **${args[1]}**`);
        } else if (cmd === 'siso') {
            if (args.length < 1) return;
            let user = await client.users.fetch(args[0]).catch(() => {
                return null;
            });
            if (!user) message.channel.send('La ID es incorrecta, no he encontrado al usuario.')
            let prob = args[1]
            if (prob && prob !== '-' && (isNaN(prob) || prob > 100 || prob < 0)) return message.channel.send('La probabilidad debe estar entre 0 y 100');

            let repetidos = config.siso.filter(e => e.id === user.id);
            if (repetidos.length > 0) {
                if (!prob) return message.channel.send(`El valor de \`${user.username}\` en siso es ${repetidos[0].val}`)
                if (prob === '-') {
                    const index = config.siso.findIndex(element => element.id === user.id);
                    config.siso.splice(index, 1);
                    return message.channel.send(`Se ha eliminado a \`${user.username}\` de siso`)
                } else {
                    repetidos[0].val = prob
                }
            } else {
                if (!prob) return message.channel.send(`No hay registro de \`${user.username}\` en siso`)
                if (prob === '-') return message.channel.send('No puedes eliminar a este usuario de siso porque no está dentro.')
                config.siso.push({ id: args[0], val: prob })
            }
            message.channel.send(`Se ha ${repetidos.length > 0 ? 'editado' : 'guardado'} a \`${user.username}\` en siso con el valor de **${args[1]}**`);
        }
    };

    if (message.channel.type === 'dm') return;

    if (message.author.bot) return;

    let prefix = config.prefix
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
        if (command.tipo.toLowerCase() === 'developer' && !config.owners.includes(message.author.id)) return;
        command.run({ client, message, args, Discord, config, Webhook });
    }
});


client.login(config.token);