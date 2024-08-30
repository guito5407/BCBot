module.exports = {
    nombre: 'pasar',
    alias: [],
    descripcion: '',
    tipo: 'aeaeaae',
    uso: 'no se',
    cooldown: '0s',

    async run({ message, client }) {
        const sv1 = await client.guilds.fetch('1276988841672314890').catch(() => {
            return null;
        });
        const sv2 = await client.guilds.fetch('1278448796870901901').catch(() => {
            return null;
        });
        const roles1 = await sv1.roles.cache
        const roles2 = await sv2.roles.cache

        const user1 = await sv1.members.fetch(message.author.id).catch(() => {
            return null;
        });
        const user2 = await sv2.members.fetch(message.author.id).catch(() => {
            return null;
        });

        user1.roles.cache.forEach(rol => {
            let roles = user2.roles.cache
            let r1 = roles.find(r => r.name === rol.name)
            if(!r1){
                let r2 = roles2.find(r => r.name === rol.name)
                if(!r2) return message.reply(`No se ha encontrado el rango \`${rol.name}\` en este servidor`);
                message.member.roles.add(r2);
            }
        });
        user2.roles.cache.forEach(rol => {
            let roles = user1.roles.cache
            let r1 = roles.find(r => r.name === rol.name)
            if(!r1){
                message.member.roles.remove(rol)
            }
        })
    }
};
