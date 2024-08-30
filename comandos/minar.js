module.exports = {
    nombre: 'minar',
    alias: ['mine'],
    descripcion: '',
    tipo: 'Rol',
    uso: 'no se',
    cooldown: '0s',

    async run({ message, args, Discord, Webhook, config }) {

        const webhook = new Webhook(2, message.channel);

        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("roll1")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setEmoji("⛏️"),
                new Discord.ButtonBuilder()
                    .setCustomId("roll2")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setEmoji("⛏️"),
                new Discord.ButtonBuilder()
                    .setCustomId("roll3")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setEmoji("⛏️"),
                new Discord.ButtonBuilder()
                    .setCustomId("roll4")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setEmoji("⛏️"),
                new Discord.ButtonBuilder()
                    .setCustomId("roll5")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setEmoji("⛏️")
            );

        let opciones = [
            "has hallado una roca. Elige un punto para romperla y descubrir su interior.",
            "frente a ti hay una piedra. Decide dónde golpearla para revelar lo que contiene.",
            "una piedra yace ante ti. Selecciona un lugar para romper y descubrir su interior.",
            "te encontraste con una roca. Elige un punto para golpear y desvelar su contenido.",
            "Has encontrado una roca. Decide dónde golpear para ver qué hay dentro.",
        ]
        let opcion = opciones[Math.floor(Math.random() * opciones.length)]

        var msg = await webhook.send({ content: `${message.author}, ${opcion}`, components: [row] })

        const collector = msg.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, time: 600000 });

        let roles = message.member.roles.cache.filter(r => r.name.includes('➜〔⛏️〕┃ Minería'))
        const indMap = {
            '¹': 1,
            '²': 2,
            '³': 3,
            '⁴': 4,
            '⁵': 5,
            '⁶': 6,
            '⁷': 7,
            '⁸': 8,
            '⁹': 9,
            '⁰': 0
        };
        const extractNumber = (str) => {
            const aea = str.match(/[¹²³⁴⁵⁶⁷⁸⁹⁰]/); // Coincide con cualquier superíndice
            return aea ? indMap[aea[0]] : null;
        }; 

        function hay(roles){
            if(roles.size > 0){
                roles.sort((a, b) => extractNumber(b.name) - extractNumber(a.name));

                return extractNumber([...roles.values()][0].name)
            }else{
                return 1;
            }
        }

        let x = hay(roles)

        function randomNumb(x, max = 5) {
            // Crear un conjunto de números en el rango 1 a max
            const numbers = Array.from({ length: max }, (_, i) => i + 1);
          
            // Barajar los números aleatoriamente
            for (let i = numbers.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Intercambia
            }
          
            // Retorna los primeros x números
            return numbers.slice(0, x);
        }
        let correctos = randomNumb(x-1)

        collector.on('collect', async i => {
            if (i.user.id !== message.author.id) {
                return i.reply({ content: '¡Este botón no es tuyo!', ephemeral: true });
            }
            let id = Number(i.customId.replace('roll', ''))//.toLocaleString('fullwide', { useGrouping: false });
            if (isNaN(id)) return;

            if(config.siso.some(e => e.id === message.author.id) && x > 1){
                let prob = config.siso.find(e => e.id === message.author.id)
                prob = prob.val;
                if(Math.floor(Math.random() * 100) < prob && !correctos.includes(id)){
                    correctos.pop()
                    correctos.push(id)
                }
            }

            const row2 = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("roll1")
                        .setStyle(id === 1 ? Discord.ButtonStyle.Success : Discord.ButtonStyle.Secondary)
                        .setEmoji(!correctos.includes(1) ? "💎" : "🪨")
                        .setDisabled(true),
                    new Discord.ButtonBuilder()
                        .setCustomId("roll2")
                        .setStyle(id === 2 ? Discord.ButtonStyle.Success : Discord.ButtonStyle.Secondary)
                        .setEmoji(!correctos.includes(2) ? "💎" : "🪨")
                        .setDisabled(true),
                    new Discord.ButtonBuilder()
                        .setCustomId("roll3")
                        .setStyle(id === 3 ? Discord.ButtonStyle.Success : Discord.ButtonStyle.Secondary)
                        .setEmoji(!correctos.includes(3) ? "💎" : "🪨")
                        .setDisabled(true),
                    new Discord.ButtonBuilder()
                        .setCustomId("roll4")
                        .setStyle(id === 4 ? Discord.ButtonStyle.Success : Discord.ButtonStyle.Secondary)
                        .setEmoji(!correctos.includes(4) ? "💎" : "🪨")
                        .setDisabled(true),
                    new Discord.ButtonBuilder()
                        .setCustomId("roll5")
                        .setStyle(id === 5 ? Discord.ButtonStyle.Success : Discord.ButtonStyle.Secondary)
                        .setEmoji(!correctos.includes(5) ? "💎" : "🪨")
                        .setDisabled(true)
                );

            if (!correctos.includes(id)) {
                var n = Math.floor(Math.random() * 4);
                i.update({ content: `${message.author}, has picado la piedra de una forma tan mediocre que has roto algunos cristales, por lo cual has conseguido ${n} ${n === 1 ? 'cristal' : 'cristales'}`, components: [row2] })
            } else {
                var n = 5+x;
                i.update({ content: `${message.author}, has picado bastante bien la piedra, por lo cual has conseguido ${n} ${n === 1 ? 'cristal' : 'cristales'}`, components: [row2] })
            }

        });

        collector.on('end', async i => {
            if (!i.size) {
                message.channel.send('No has interactuado a tiempo. ||///||')
            }
        });
    }
};
