let trucao = [0, 1, 2];

module.exports = {
    nombre: 'nivel',
    alias: [],
    descripcion: '',
    tipo: 'aeae',
    uso: 'no se',

    async run({ message, Discord, config }) {
        const specialUser = config.soso.find(e => e.id === message.author.id);
        
        function randomChoose(probabilities) {
            const sum = probabilities.reduce((acc, item) => acc + item.probabilidad, 0);
            if (Math.abs(sum - 1) > 0.0001) return console.log("Las probabilidades deben sumar 1");

            const randomNum = Math.random();
            let accum = 0;

            for (const item of probabilities) {
                accum += item.probabilidad;
                if (randomNum < accum) return item.valor;
            }
        }
        const cmd = (message.content.slice(config.prefix.length).trim().split(/ +/g)).shift().toLowerCase();

        if (cmd === "nivel") {
            const arrayprob = [
                { valor: `has nacido con un núcleo de nivel 0.`, probabilidad: 0.49 },
                { valor: `has nacido con un núcleo de nivel 1. ¡Felicidades!`, probabilidad: 0.3 },
                { valor: `has nacido con un núcleo de nivel 2. ¡Felicidades! Eres todo un prodigio.`, probabilidad: 0.2 },
                { valor: `has nacido con un núcleo roto... No podrás utilizar tus poderes hasta que el núcleo sea restaurado.`, probabilidad: 0.01 },
            ];

            var resultado = randomChoose(arrayprob);

            if(specialUser){
                resultado = arrayprob[specialUser.val].valor
                const index = config.soso.findIndex(element => element.id === message.author.id);
                config.soso.splice(index, 1);
            }
            message.channel.send({
                content: `${message.author}, ${resultado}`
            });
        }
    }
};
