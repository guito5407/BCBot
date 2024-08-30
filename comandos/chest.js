module.exports = {
    nombre: 'chest',
    alias: ['cofre', 'tesoro'],
    descripcion: '',
    tipo: 'aeae',
    uso: 'no se',
    cooldown: '0s',

    async run({ message, args, Discord, Webhook }) {

        let rangos = [
            'S',
            'A',
            'B',
            'C',
            'D',
            'E',
        ]

        let tipo = args[0]
        if (rangos.includes(tipo)) tipo = rangos.findIndex(element => element === tipo) + 1;
        if (!tipo || isNaN(tipo) || tipo > 6 || tipo < 0) tipo = 6;

        const webhook = new Webhook(1, message.channel);

        function randomChoose(probabilities) {
            const sum = probabilities.reduce((acc, item) => acc + item.probabilidad, 0);
            if (Math.abs(sum - 1) > 0.0001) throw new Error("Las probabilidades deben sumar 1");

            const randomNum = Math.random();
            let accum = 0;

            for (const item of probabilities) {
                accum += item.probabilidad;
                if (randomNum < accum) return item.valor;
            }
        }
        let PR = [
            [
                { valor: 'artefacto raro', probabilidad: 0.25 },
                { valor: 'artefacto único', probabilidad: 0.25 },
                { valor: 'artefacto legendario', probabilidad: 0.499 },
                { valor: 'artefacto mítico', probabilidad: 0.001 },
            ],
            [
                { valor: 'artefacto común', probabilidad: 0.01 },
                { valor: 'artefacto poco común', probabilidad: 0.01 },
                { valor: 'artefacto raro', probabilidad: 0.20 },
                { valor: 'artefacto único', probabilidad: 0.70 },
                { valor: 'artefacto legendario', probabilidad: 0.08 },
            ],
            [
                { valor: 'artefacto común', probabilidad: 0.05 },
                { valor: 'artefacto poco común', probabilidad: 0.10 },
                { valor: 'artefacto raro', probabilidad: 0.70 },
                { valor: 'artefacto único', probabilidad: 0.15 },
            ],
            [
                { valor: 'artefacto común', probabilidad: 0.10 },
                { valor: 'artefacto poco común', probabilidad: 0.70 },
                { valor: 'artefacto raro', probabilidad: 0.19 },
                { valor: 'artefacto único', probabilidad: 0.01 },
            ],
            [
                { valor: 'artefacto común', probabilidad: 0.45 },
                { valor: 'artefacto poco común', probabilidad: 0.54 },
                { valor: 'artefacto raro', probabilidad: 0.01 },
            ],
            [
                { valor: 'artefacto común', probabilidad: 0.98 },
                { valor: 'artefacto poco común', probabilidad: 0.02 },
            ],
        ];

        let recompensas = [randomChoose(PR[tipo - 1]), randomChoose(PR[tipo - 1]), randomChoose(PR[tipo - 1])]

        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("roll1")
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setEmoji("💰"),
                new Discord.ButtonBuilder()
                    .setCustomId("roll2")
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setEmoji("💰"),
                new Discord.ButtonBuilder()
                    .setCustomId("roll3")
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setEmoji("💰"),
                new Discord.ButtonBuilder()
                    .setCustomId("roll4")
                    .setStyle(Discord.ButtonStyle.Success)
                    .setLabel(`Rango ${rangos[tipo - 1]}`)
                    .setDisabled(true)
            );
        let msg = await webhook.send({ content: `*### ¡Felicidades ${message.author}! Has encontrado un cofre.\n** **\nElige una de las tres recompensas.\n\n**__¡Pero ten cuidado! Una vez la elijas no habrá marcha atrás.__***`, components: [row] });

        const collector = msg.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, time: 600000 });

        collector.on('collect', async i => {
            if (i.user.id !== message.author.id) {
                return i.reply({ content: '¡Este botón no es tuyo!', ephemeral: true });
            }
            collector.resetTimer();
            let id = Number(i.customId.replace('roll', '')).toLocaleString('fullwide', { useGrouping: false });
            if (isNaN(id)) return;
            let rec = recompensas[id - 1]
            const row2 = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("rollf1")
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setEmoji("💰"),
                    new Discord.ButtonBuilder()
                        .setCustomId("rollf2")
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setEmoji("💰"),
                    new Discord.ButtonBuilder()
                        .setCustomId("rollf3")
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setEmoji("💰"),
                    new Discord.ButtonBuilder()
                        .setCustomId("rollf4")
                        .setStyle(Discord.ButtonStyle.Success)
                        .setLabel(`Rango ${rangos[tipo - 1]}`)
                        .setDisabled(true)
                );

            i.update({ content: `*${message.author} has abierto el cofre... Y en su interior has encontrado un **${rec}**.*`, components: [row2] })
            collector.stop();

            const collector2 = msg.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, time: 600000 });

            collector2.on('collect', async i => {

                collector2.resetTimer();
                let id = Number(i.customId.replace('rollf', '')).toLocaleString('fullwide', { useGrouping: false });
                if (isNaN(id)) return;
                let rec = recompensas[id - 1]

                i.reply({ content: `La recompensa del botón N°${id} era ${rec}`, ephemeral: true })
            })
        });

        collector.on('end', async i => {
            if (!i.size) {
                message.channel.send('No has interactuado a tiempo. ||///||')
            }
        });
    }
};
