module.exports = {
    nombre: 'gate',
    alias: ['g'],
    descripcion: '',
    tipo: 'aeae',
    uso: 'no se',
    cooldown: '0s',

    async run({ message, Discord, config }) {
        if(!message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return;
        if(message.guild.id !== '1278448796870901901') return;
        let canales = []
        let temática = 'Edificio'
        var embed = new Discord.EmbedBuilder()
            .setColor(config.color.primary);

        function editEmbed() {
            embed.setDescription(`
        ## Generando mazmorra <a:reload:1002032982997090414>
        
        ### Temática:
        ${temática}  
        ### Canales:
        \`${canales.join('\n')}\`
                    `)
        }
        editEmbed()

        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("tematica")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setLabel(`Nueva temática`)
                    .setEmoji("🔄"),
                new Discord.ButtonBuilder()
                    .setCustomId("canales")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setLabel(`Nuevos canales`)
                    .setEmoji("🔄")
            );
        const row2 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("generar")
                    .setStyle(Discord.ButtonStyle.Success)
                    .setLabel(`Generar`),
                new Discord.ButtonBuilder()
                    .setCustomId("cancelar")
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setLabel(`Cancelar`)
            );

        let msg = await message.channel.send({ embeds: [embed], components: [row, row2] });

        let tematicas = [
            'Bosque',
            'Edificio',
            'Infernal',
            'Santa',
            'Marina',
            'Desierto',
            'Invernal'
        ]
        let opciones = {
            // Temática Bosque (exterior)
            Bosque:
                [
                    { name: "⌠🌲⌡・Bosque・｡˚", prioridad: 0 },
                    { name: "⌠🌿⌡・Claros del Bosque・｡˚", prioridad: 0 },
                    { name: "⌠🌳⌡・Árbol Anciano・｡˚", prioridad: 1 },
                    { name: "⌠🏕️⌡・Campamento Abandonado・｡˚", prioridad: 0 },
                    { name: "⌠🍄⌡・Sendero de Hongos Gigantes・｡˚", prioridad: 0 },
                    { name: "⌠🐻⌡・Cueva・｡˚", prioridad: 1 },
                    { name: "⌠🕸️⌡・Gran Cañon ・｡˚", prioridad: 0 },
                    { name: "⌠🦉⌡・Santuario Olvidado・｡˚", prioridad: 0 },
                    { name: "⌠💀⌡・Barranco de Huesos・｡˚", prioridad: 1 }
                ],

            // Temática Edificio (interior)
            Edificio:
                [
                    { name: "⌠🏰⌡・Salón del Castillo・｡˚", prioridad: 0 },
                    { name: "⌠📚⌡・Biblioteca・｡˚", prioridad: 0 },
                    { name: "⌠🔒⌡・Prisión・｡˚", prioridad: 0 },
                    { name: "⌠👑⌡・Sala de Tronos・｡˚", prioridad: 2 },
                    { name: "⌠⚔️⌡・Sala de Armas・｡˚", prioridad: 0 },
                    { name: "⌠🍷⌡・Bodega de Vino・｡˚", prioridad: 0 },
                    { name: "⌠🛏️⌡・Dormitorios・｡˚", prioridad: 0 },
                    { name: "⌠⚗️⌡・Laboratorio Alquímico・｡˚", prioridad: 1 },
                    { name: "⌠🛡️⌡・Sala de Guardianes・｡˚", prioridad: 0 }
                ],

            // Temática Infernal
            Infernal:
                [
                    { name: "⌠🔥⌡・Cámara de Fuego・｡˚", prioridad: 0 },
                    { name: "⌠👹⌡・Foso de Lava・｡˚", prioridad: 1 },
                    { name: "⌠🩸⌡・Río de Sangre・｡˚", prioridad: 0 },
                    { name: "⌠💀⌡・Sala de los Condenados・｡˚", prioridad: 1 },
                    { name: "⌠🔥⌡・Puente Infinito・｡˚", prioridad: 0 },
                    { name: "⌠🔗⌡・Cárcel de Almas・｡˚", prioridad: 1 },
                    { name: "⌠⚒️⌡・Forja Infernal・｡˚", prioridad: 0 },
                    { name: "⌠⛓️⌡・Cámara de Tortura・｡˚", prioridad: 0 }
                ],

            // Temática Santa
            Santa:
                [
                    { name: "⌠⛪⌡・Santuario Sagrado・｡˚", prioridad: 1 },
                    { name: "⌠🕊️⌡・Cámara de la Luz・｡˚", prioridad: 0 },
                    { name: "⌠✝️⌡・Cripta de los Mártires・｡˚", prioridad: 0 },
                    { name: "⌠🌟⌡・Altar Celestial・｡˚", prioridad: 1 },
                    { name: "⌠🎶⌡・Sala de los Coros Angelicales・｡˚", prioridad: 0 },
                    { name: "⌠🔔⌡・Campanario Divino・｡˚", prioridad: 0 },
                    { name: "⌠🌿⌡・Jardín Sagrado・｡˚", prioridad: 0 },
                    { name: "⌠🕯️⌡・Cámara de Meditación・｡˚", prioridad: 0 },
                    { name: "⌠⚱️⌡・Relicario・｡˚", prioridad: 1 },
                    { name: "⌠🕯️⌡・Sala de los Santos・｡˚", prioridad: 0 }
                ],

            // Temática Marina (exterior/interior)
            Marina:
                [
                    { name: "⌠🌊⌡・Caverna Sumergida・｡˚", prioridad: 0 },
                    { name: "⌠🐚⌡・Santuario del Mar・｡˚", prioridad: 1 },
                    { name: "⌠⚓⌡・Bodega del Naufragio・｡˚", prioridad: 0 },
                    { name: "⌠🐟⌡・Lago Místico・｡˚", prioridad: 0 },
                    { name: "⌠🦀⌡・Cueva・｡˚", prioridad: 0 },
                    { name: "⌠🧜⌡・Estatuas Olvidadas・｡˚", prioridad: 0 },
                    { name: "⌠🌑⌡・Abismo Oscuro・｡˚", prioridad: 1 },
                    { name: "⌠🌾⌡・Pradera de Algas Gigantes・｡˚", prioridad: 0 }
                ],

            // Temática Desierto (exterior/interior)
            Desierto:
                [
                    { name: "⌠🏜️⌡・Dunas Desérticas・｡˚", prioridad: 0 },
                    { name: "⌠🏺⌡・Templo Abandonado・｡˚", prioridad: 1 },
                    { name: "⌠🐍⌡・Caverna de las Serpientes・｡˚", prioridad: 0 },
                    { name: "⌠🔥⌡・Sala de Arena y Fuego・｡˚", prioridad: 1 },
                    { name: "⌠🏜️⌡・Oasis Escondido・｡˚", prioridad: 0 },
                    { name: "⌠💀⌡・Cementerio de Guerreros・｡˚", prioridad: 2 }
                ],

            // Temática Invernal
            Invernal:
                [
                    { name: "⌠❄️⌡・Bosque Nevado・｡˚", prioridad: 0 },
                    { name: "⌠🏔️⌡・Cueva de Hielo・｡˚", prioridad: 0 },
                    { name: "⌠🌨️⌡・Cañón de Tormenta de Nieve・｡˚", prioridad: 0 },
                    { name: "⌠🦌⌡・Bosque Escondido・｡˚", prioridad: 0 },
                    { name: "⌠❄️⌡・Sala de Cristales de Hielo・｡˚", prioridad: 1 },
                    { name: "⌠☃️⌡・Altar・｡˚", prioridad: 1 },
                    { name: "⌠🌬️⌡・Sala de Vientos Helados・｡˚", prioridad: 1 },
                    { name: "⌠🐻⌡・Sala del Tesoro・｡˚", prioridad: 0 },
                    { name: "⌠🏰⌡・Fortaleza Congelada・｡˚", prioridad: 2 }
                ]
        };  

        const collector = msg.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, time: 600000 });

        collector.on('collect', async i => {
            if (i.user.id !== message.author.id) {
                return i.reply({ content: '¡Este botón no es tuyo!', ephemeral: true });
            }
            let id = i.customId;
            collector.resetTimer();
            if(id === 'tematica'){
                temática = tematicas[Math.floor(Math.random() * tematicas.length)];
                editEmbed()
                i.update({embeds:[embed]})
            }
            else if(id === 'canales'){
                canales = [];
                let temp = [
                    {name: "⌠🚪⌡・Entrada・｡˚", prioridad: -1},
                    {name: "⌠👿⌡・sala del jefe・｡˚", prioridad: 4},
                    {name: "⌠💰⌡・Sala de Tesoro・｡˚", prioridad: 5},
                ]
                for (let i = 0; i < 5; i++) {
                    let tematica = opciones[temática]    
                    let canal = tematica[Math.floor(Math.random() * tematica.length)]
                    temp.push(canal);
                }
                temp.sort((a,b) => a.prioridad - b.prioridad)
                for (let i = 0; i < temp.length; i++) {
                    canales.push(temp[i].name)
                }
                editEmbed()
                i.update({embeds:[embed]})
            }
            else if(id === 'cancelar'){
                const embed2 = new Discord.EmbedBuilder()
                .setColor(config.color.danger)
                .setDescription('Comando cancelado.');
                i.update({embeds: [embed2], components: []})
                collector.stop()
            }
            else if(id === 'generar'){
                if(canales.length > 0){
                    i.update({components: []})
                    message.channel.send('Empezaré a crear los canales y la categoría!')
                    let cat = await message.guild.channels.create({
                        name: `☆━━━│Mazmorra ${temática}・`,
                        type: Discord.ChannelType.GuildCategory
                    });
                    canales.forEach(async canal => {
                       let cnl = await message.guild.channels.create({
                            name: canal,
                            type: Discord.ChannelType.GuildText,
                            parent: cat.id
                        });
                        if(canal === canales[0]){
                            cnl.send(`${message.author}, mazmorra creada! ///`)
                        }
                    });
                    /*let cnl = cat.children.cache.first();
                    cnl.send(`${message.author}, mazmorra creada! ///`)*/
                }
            }
        });

        collector.on('end', async i => {
            if (!i.size) {
                message.channel.send('Has demorado mucho en interactuar.')
            }
        });
    }
};
