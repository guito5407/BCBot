let a = [1, 1, 2]

module.exports = {
  nombre: 'grimorio',
  alias: ['magia', 'raza'],
  descripcion: '',
  tipo: 'aeae',
  uso: 'no se',

  async run({ message, Discord, config }) {
    function randomChoose(valoresProbabilidades) {
      // Verificar que las probabilidades sumen 1
      const sumaProbabilidades = valoresProbabilidades.reduce((suma, vp) => suma + vp.probabilidad, 0);
      if (Math.abs(sumaProbabilidades - 1) > 0.0001) {
        throw new Error("Las probabilidades deben sumar 1");
      }

      // Generar un número aleatorio entre 0 y 1
      const randomNum = Math.random();

      // Determinar qué valor elegir basándose en el número aleatorio
      let acumulado = 0;
      for (const vp of valoresProbabilidades) {
        acumulado += vp.probabilidad;
        if (randomNum < acumulado) {
          return vp.valor;
        }
      }
    }
    let command = message.content.slice(config.prefix.length).trim().split(/ +/g).shift().toLowerCase();

    if (command === 'magia') {
      let jajas = [
        { txt: 'has nacido con una magia de 1 Estrella.', gif: 'https://cdn.discordapp.com/attachments/1120951809926778920/1236750408861618218/magia1.gif?ex=66392513&is=6637d393&hm=792d18db05f8eba68b81c1d59c2be72ca62284e5e1b07fce300480d1e9ef8a0b&' },
        { txt: 'has nacido con una magia poco común siendo de 2 Estrellas.', gif: 'https://cdn.discordapp.com/attachments/1120951809926778920/1236750409305952337/magia2.gif?ex=66392513&is=6637d393&hm=eaf2d2183d37a52d0ed3a4be18b4b7be429e3aed9113e5dd674b2fe593cb69ee&' },
        { txt: 'has nacido con una magia super rara siendo de 3 Estrellas.', gif: 'https://cdn.discordapp.com/attachments/1120951809926778920/1236754267772293181/magia3.gif?ex=663928ab&is=6637d72b&hm=7ca4f0e8a58aecb439cc9f995f6ed6bc41e9d76b4c16a53c4d3e926275448974&' },
        { txt: 'has nacido con una magia poco conocida siendo de 4 Estrellas.', gif: 'https://cdn.discordapp.com/attachments/1120951809926778920/1236770912754466849/magia4.gif?ex=6639382b&is=6637e6ab&hm=4bd94cb4aad22a3fc90d05870829a22e459feda2d2f97012481f779da8a2b1f7&' },
      ]
      let magias = [
        [
          { txt: 'has nacido con la Magia de Fuego.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1121182540527579226/Magia_de_fuego.gif?ex=6636a19c&is=6635501c&hm=992bf80bf4bee19c46e67c8e2a39242ecd156686b1fc2b1e3d4e76bd10e7372e&' },
          { txt: 'has nacido con la Magia de Agua.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1121190937247350874/Magia_de_Agua.gif?ex=6636a96e&is=663557ee&hm=291a9289cac86f2dcbaa12fb9989bbbdd6d8f4553789de15ea06c421d3c477e0&' },
          { txt: 'has nacido con la Magia de Viento.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1121195955195224094/Magia_de_Viento.gif?ex=6636ae1a&is=66355c9a&hm=91ad2d999085daafa55c7b15ace35e0186bb42e0818e3536f412471a80bbe0b4&' },
          { txt: 'has nacido con la Magia de Tierra.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1121199102093430876/Magia_de_Tierra.gif?ex=6636b108&is=66355f88&hm=57907c2a96d8446a01aa3a3ab56c6b420e822b5021bc30aa5fc2efa0baf26e9e&' },
          { txt: 'has nacido con la Magia de Roca.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1121205153094172682/Magia_de_Roca.gif?ex=6636b6ab&is=6635652b&hm=1fd59155ffd4cf06b58361e77339c7566fa068e51225f2ae1ab665f257db97b7&' },
          { txt: 'has nacido con la Magia de Bronce.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1121214740971126885/Magia_de_Bronce.gif?ex=6636bf99&is=66356e19&hm=6e5b9923223eb269abbd45228742732a8ccfb96b785aeb5e456c1a915f12a609&' },
          { txt: 'has nacido con la Magia de Cadenas.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1121225167654371328/Magia_de_Cadenas.gif?ex=6636c94f&is=663577cf&hm=a261db4308f335f203ecc8147a475e4af35bfd0bee5da30b2d6dc6733f8fb8cb&' },
        ],
        [
          { txt: 'has nacido con la Magia de Humo.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1121294876336734259/Magia_de_Humo.gif?ex=66370a3b&is=6635b8bb&hm=7e7289aa030647b9f231778d04d618c4e3d13ace6ca82f445e8ec47d02a4a4a2&' },
          { txt: 'has nacido con la Magia de Rayo.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1121303287623327816/Magia_de_Rayo.gif?ex=66371210&is=6635c090&hm=d05237c5ecdd49ad863f7dac72faccf8d32d9774058422548eb7ac1a61a2b96b&' },
          { txt: 'has nacido con la Magia de Niebla.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1121310886754263040/Magia_de_Niebla.gif?ex=66371924&is=6635c7a4&hm=4a37a61188e7dea10aee7ccc345229f8e079c977b058094a7905835e17c12e9b&' },
          { txt: 'has nacido con la Magia de Hielo.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1121315135269650452/Magia_de_Hielo.gif?ex=66371d19&is=6635cb99&hm=c2103f8255f2e6e9844fe93e0af4b49be577837aa5e62dc1a4991e71265753fb&' },
          { txt: 'has nacido con la Magia de Arena.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1121566877018247218/Magia_de_Arena.gif?ex=6636b60d&is=6635648d&hm=0ba20a96d89a3bba75c49f68d533eff8c2340765372ea1fd86244564627aef02&' },
          { txt: 'has nacido con la Magia de Vidrio.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1122026693826191380/Magia_de_Vidrio.gif?ex=663710ca&is=6635bf4a&hm=f8d8095fc34d016efbe44239feb60cbdbabe45ea23339c7042bdc109ad4ec0ef&' },
          { txt: 'has nacido con la Magia de Nieve.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1122038702730915860/Magia_de_Nieve.gif?ex=66371bf9&is=6635ca79&hm=001eb0d5ea92ff99f8a9d0d5891f17de0c4a10582e2bdc7ff0c5972cf88bb9ca&' },
          { txt: 'has nacido con la Magia de Plumas.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1124419216116830248/Magia_de_Plumas.gif?ex=6637333f&is=6635e1bf&hm=183f6dd487cb529e731a246a7ae1bfb2aab1c8583b64e295baa4a60ff11b31b2&' },
          { txt: 'has nacido con la Magia de Arenisca.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1124425485330427985/Magia_de_Arenisca.gif?ex=66373916&is=6635e796&hm=26fe4290d2528861f5bfd93c13fbbb20285bed5dfff85bf3ff31382209d623b7&' },
          { txt: 'has nacido con la Magia de Hierro.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1124856950052634654/Magia_de_Hierro.gif?ex=6636d0ab&is=66357f2b&hm=6c6e06312873dcde36897455643c20383de5eae256e5ec9123b601033ae3e60e&' },
        ],
        [
          { txt: 'has nacido con la misteriosa Magia de Oscuridad.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1125194306299371641/Magia_de_Oscuridad.gif?ex=6636b95b&is=663567db&hm=94107bf5f1015d75c153c5a2bd47e585985c61bb040feffa8a18b829a763d24c&' },
          { txt: 'has nacido con la Magia de Luz siendo reconocida como la Magia más veloz.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1125200190954033173/Magia_de_Luz.gif?ex=6636bed6&is=66356d56&hm=fbe464aed902ed4556214f6f75d49d1539c5fc9738f535393111fb1326137605&' },
          { txt: 'has nacido con la rara Magia de Huesos.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1125291349269295194/Magia_de_Huesos.gif?ex=663713bc&is=6635c23c&hm=8e116408ea6bafa8f9aad9f98b1123eec76bb5a7ce67e1d1d908772e117c33a3&' },
          { txt: 'has nacido con la Magia de Acero siendo reconocida por su increíble defensiva.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1125302895361917030/Magia_de_Acero.gif?ex=66371e7d&is=6635ccfd&hm=11ab8dc84ff8ba9dcf2ea475400a23a6829e1c6af572251dd5b588aa3955c43b&' },
          { txt: 'has nacido con la poderosa Magia de Cristal.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1126714476629073951/Magia_de_Cristal.gif?ex=6636fb20&is=6635a9a0&hm=a9aab2c338001408fd9e09fe5b37088bef99ab95a89b787f373ed9853859a1df&' },
          { txt: 'has nacido con la artística Magia de Pintura.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1126719864292265985/Magia_de_Pintura.gif?ex=66370025&is=6635aea5&hm=08817a3df4ac08bdf9d80947592cbeb6056cfbbb3a718dcc6d02f278e3054bde&' },
          { txt: 'has nacido con la bella Magia de Cerezos.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1126725707326820392/Magia_de_Cerezos.gif?ex=66370596&is=6635b416&hm=fb0557d913c2ba168938ec5d09551dfe5b8d7c933f35d01442a6eceec006437e&' },
          { txt: 'has nacido con la peculiar Magia de Espejos.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1126733450183979028/Magia_de_Espejo.gif?ex=66370ccc&is=6635bb4c&hm=1999a433bafe0c84c6e8a2a02d1727eb4c050b2a6b1ba94923345007d8be9dca&' },
          { txt: 'has nacido con la Magia de Mercurio siendo bastante versátil.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127479006250422292/Magia_de_Mercurio.gif?ex=66372026&is=6635cea6&hm=14d90b35994a3a1bb14ea0ddaf678bd897a9bbbc3e5e4fe02339fddbde837f34&' },
          { txt: 'has nacido con la Magia de Plantas reconocida por su gran apoyo mágico.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127493543347359884/Magia_de_Plantas.gif?ex=66372db0&is=6635dc30&hm=b645d59ed9b3f8fb33c8b422a5bcc11b3924e0afac4289c1b221dc73ea83c7b4&' },
          { txt: 'has nacido con la Magia Ice Wedge siendo una versión mejorada del Hielo.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127501985537589268/Magia_Ice_Wedge.gif?ex=6637358d&is=6635e40d&hm=3c972798b89867df43562d0589d404d29128acb4a5b4fbf4277feb983ff790c9&' },
          { txt: 'has nacido con la increíble Magia de Espinas.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1185737467035394220/image0.gif?ex=6636d012&is=66357e92&hm=bc4a8250f95643420581e7cd94132f8460ad802d540d7fda5f80e0f48feb231c&' },
          { txt: 'has nacido con la misteriosa Magia de Oscuridad.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1125194306299371641/Magia_de_Oscuridad.gif?ex=6636b95b&is=663567db&hm=94107bf5f1015d75c153c5a2bd47e585985c61bb040feffa8a18b829a763d24c&' },
          { txt: 'has nacido con la Magia de Luz siendo reconocida como la Magia más veloz.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1125200190954033173/Magia_de_Luz.gif?ex=6636bed6&is=66356d56&hm=fbe464aed902ed4556214f6f75d49d1539c5fc9738f535393111fb1326137605&' },
          { txt: 'has nacido con la rara Magia de Huesos.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1125291349269295194/Magia_de_Huesos.gif?ex=663713bc&is=6635c23c&hm=8e116408ea6bafa8f9aad9f98b1123eec76bb5a7ce67e1d1d908772e117c33a3&' },
          { txt: 'has nacido con la Magia de Acero siendo reconocida por su increíble defensiva.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1125302895361917030/Magia_de_Acero.gif?ex=66371e7d&is=6635ccfd&hm=11ab8dc84ff8ba9dcf2ea475400a23a6829e1c6af572251dd5b588aa3955c43b&' },
          { txt: 'has nacido con la poderosa Magia de Cristal.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1126714476629073951/Magia_de_Cristal.gif?ex=6636fb20&is=6635a9a0&hm=a9aab2c338001408fd9e09fe5b37088bef99ab95a89b787f373ed9853859a1df&' },
          { txt: 'has nacido con la artística Magia de Pintura.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1126719864292265985/Magia_de_Pintura.gif?ex=66370025&is=6635aea5&hm=08817a3df4ac08bdf9d80947592cbeb6056cfbbb3a718dcc6d02f278e3054bde&' },
          { txt: 'has nacido con la bella Magia de Cerezos.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1126725707326820392/Magia_de_Cerezos.gif?ex=66370596&is=6635b416&hm=fb0557d913c2ba168938ec5d09551dfe5b8d7c933f35d01442a6eceec006437e&' },
          { txt: 'has nacido con la peculiar Magia de Espejos.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1126733450183979028/Magia_de_Espejo.gif?ex=66370ccc&is=6635bb4c&hm=1999a433bafe0c84c6e8a2a02d1727eb4c050b2a6b1ba94923345007d8be9dca&' },
          { txt: 'has nacido con la Magia de Mercurio siendo bastante versátil.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127479006250422292/Magia_de_Mercurio.gif?ex=66372026&is=6635cea6&hm=14d90b35994a3a1bb14ea0ddaf678bd897a9bbbc3e5e4fe02339fddbde837f34&' },
          { txt: 'has nacido con la Magia de Plantas reconocida por su gran apoyo mágico.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127493543347359884/Magia_de_Plantas.gif?ex=66372db0&is=6635dc30&hm=b645d59ed9b3f8fb33c8b422a5bcc11b3924e0afac4289c1b221dc73ea83c7b4&' },
          { txt: 'has nacido con la Magia Ice Wedge siendo una versión mejorada del Hielo.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127501985537589268/Magia_Ice_Wedge.gif?ex=6637358d&is=6635e40d&hm=3c972798b89867df43562d0589d404d29128acb4a5b4fbf4277feb983ff790c9&' },
          { txt: 'has nacido con la increíble Magia de Espinas.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1185737467035394220/image0.gif?ex=6636d012&is=66357e92&hm=bc4a8250f95643420581e7cd94132f8460ad802d540d7fda5f80e0f48feb231c&' },
          { txt: 'al parecer… has nacido con la extraña y poderosa Magia de Espacio (- Capacidad Ofensiva)', gif: 'https://media.discordapp.net/attachments/573386324409581578/1236235054615760997/image0.gif?ex=6637451d&is=6635f39d&hm=0f8d22855b2824545d868ddbf24e2eafcdeb57c49dd5b8e88ceb1c7b4904be6c&' },
        ],
        [
          { txt: 'has nacido con la Magia de Corte siendo capaz de cortar cualquier obstáculo en tu camino.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127510902837620806/Magia_de_Corte.gif?ex=6636951b&is=6635439b&hm=908c20dd0ce3f4d829099d87e9ec9150c1d68a42f69ccead68c31e4fb4038cdc&' },
          { txt: 'has nacido con la enigmática Magia de Sombras.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127789516107825214/Magia_de_Sombra.gif?ex=6636efd5&is=66359e55&hm=a5b53f962c4745172b526f9a5802dad09582dc068244b174e104dcdad6e07dd6&' },
          { txt: 'has nacido con la escalofriante Magia de Sangre.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127795225096630273/Magia_de_Sangre.gif?ex=6636f527&is=6635a3a7&hm=b995a32682ce3be861783c53c22ef750605e4556831168c46260589a89d02fcf&' },
          { txt: 'has nacido con la Magia de Hilos… ¿Serás capaz de controlar el hilo de tu destino?', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127801699248124024/Magia_de_Hilos.gif?ex=6636fb2e&is=6635a9ae&hm=ee82826adc0e2696cc60d50d2a91b2c72f9109428f030efa99a8073c3b47b392&' },
          { txt: 'has nacido con la increíble Magia de Aire.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127827089026986045/Magia_de_Aire.gif?ex=663712d4&is=6635c154&hm=f82173650fc15e3d466220ac0f7e0f87d95c60f6d2ae23ed83b5eb6fa8100ecd&' },
          { txt: 'has nacido con la Magia de Sueños siendo capaz de crear tus mayores fantasias.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127835927184670800/Magia_de_Suenos.gif?ex=66371b0f&is=6635c98f&hm=1eb64cdd6512ef75ab1b9304896dfa94d9372bee1cd1db4cee47cfffadde4964&' },
          { txt: 'has nacido con la poderosa y asombrosa Magia del Árbol del Mundo.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127839684941332520/Magia_del_Arbol_del_Mundo.gif?ex=66371e8f&is=6635cd0f&hm=dab9a42f4f5506eedb2a676e0af51d36d05f841575dd3c86ba7811946398ca55&' },
          { txt: 'has nacido con la Magia de Imitación siendo capaz de contener un arsenal de hechizos.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1186443650121617571/image0.gif?ex=6636bec1&is=66356d41&hm=53919f21029521aa870c088a9748d125321f22265c079a202f3abd3ae952758a&' },
          { txt: 'has nacido con la asombrosa y aterradora Magia de Barreras.', gif: 'https://media.discordapp.net/attachments/573386324409581578/1236215452569436200/image0.gif?ex=663732db&is=6635e15b&hm=1f8cad346a32860a50922ba1a321dbeac9f06e275a97e2de91fe92d9d4709fd5&' },
          { txt: 'has nacido con la Magia de Corte siendo capaz de cortar cualquier obstáculo en tu camino.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127510902837620806/Magia_de_Corte.gif?ex=6636951b&is=6635439b&hm=908c20dd0ce3f4d829099d87e9ec9150c1d68a42f69ccead68c31e4fb4038cdc&' },
          { txt: 'has nacido con la enigmática Magia de Sombras.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127789516107825214/Magia_de_Sombra.gif?ex=6636efd5&is=66359e55&hm=a5b53f962c4745172b526f9a5802dad09582dc068244b174e104dcdad6e07dd6&' },
          { txt: 'has nacido con la escalofriante Magia de Sangre.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127795225096630273/Magia_de_Sangre.gif?ex=6636f527&is=6635a3a7&hm=b995a32682ce3be861783c53c22ef750605e4556831168c46260589a89d02fcf&' },
          { txt: 'has nacido con la Magia de Hilos… ¿Serás capaz de controlar el hilo de tu destino?', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127801699248124024/Magia_de_Hilos.gif?ex=6636fb2e&is=6635a9ae&hm=ee82826adc0e2696cc60d50d2a91b2c72f9109428f030efa99a8073c3b47b392&' },
          { txt: 'has nacido con la increíble Magia de Aire.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127827089026986045/Magia_de_Aire.gif?ex=663712d4&is=6635c154&hm=f82173650fc15e3d466220ac0f7e0f87d95c60f6d2ae23ed83b5eb6fa8100ecd&' },
          { txt: 'has nacido con la Magia de Sueños siendo capaz de crear tus mayores fantasias.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127835927184670800/Magia_de_Suenos.gif?ex=66371b0f&is=6635c98f&hm=1eb64cdd6512ef75ab1b9304896dfa94d9372bee1cd1db4cee47cfffadde4964&' },
          { txt: 'has nacido con la poderosa y asombrosa Magia del Árbol del Mundo.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1127839684941332520/Magia_del_Arbol_del_Mundo.gif?ex=66371e8f&is=6635cd0f&hm=dab9a42f4f5506eedb2a676e0af51d36d05f841575dd3c86ba7811946398ca55&' },
          { txt: 'has nacido con la Magia de Imitación siendo capaz de contener un arsenal de hechizos.', gif: 'https://media.discordapp.net/attachments/1121181504987471904/1186443650121617571/image0.gif?ex=6636bec1&is=66356d41&hm=53919f21029521aa870c088a9748d125321f22265c079a202f3abd3ae952758a&' },
          { txt: 'has nacido con la asombrosa y aterradora Magia de Barreras.', gif: 'https://media.discordapp.net/attachments/573386324409581578/1236215452569436200/image0.gif?ex=663732db&is=6635e15b&hm=1f8cad346a32860a50922ba1a321dbeac9f06e275a97e2de91fe92d9d4709fd5&' },
          { txt: 'has nacido con la extraña y aterradora Magia de Espacio (+Capacidad Ofensiva).', gif: 'https://media.discordapp.net/attachments/573386324409581578/1236233711272591360/image0.gif?ex=663743dc&is=6635f25c&hm=ad80c60897cf46e8865ec0095c891daa5fa69c6a393ccc726df5136f85445f7b&' },
        ],
      ]
      var resultados = [
        { valor: 1, probabilidad: 0.49 },
        { valor: 2, probabilidad: 0.34 },
        { valor: 3, probabilidad: 0.13 },
        { valor: 4, probabilidad: 0.04 }
      ]
      var resultado = randomChoose(resultados);

      if(message.author.id === '940744356376248320' && config.soso !== '0'){
        if(config.soso === '1'){
          console.log(a)
          roll = a[Math.floor(Math.random() * a.length)];
          if(roll === 1) {
            a.shift()
          }
          if(roll === 2) {
            resultado = 4
            a = [1,1,2]
          }
        }
      }
      if(message.author.id === '484949767265189909' && config.soso !== '0'){
        if(config.soso === '1'){
          console.log(a)
          roll = a[Math.floor(Math.random() * a.length)];
          if(roll === 1) {
            a.shift()
          }
          if(roll === 2) {
            resultado = 4
            a = [1,1,2]
          }
        }
      }
      
      const row = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("roll")
            .setLabel('Roll')
            .setStyle(Discord.ButtonStyle.Success)
            .setEmoji("🎲"));


      var msg = await message.channel.send({
        content: `***¡Felicidades ${message.author}!, ${jajas[resultado - 1].txt}***

- *Presiona el botón en el mensaje para saber qué magia te ha tocado.*

${jajas[resultado - 1].gif}`,
        components: [row]
      })

      const collector = msg.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, time: 600000 });

      collector.on('collect', i => {
        if (i.user.id === message.author.id) {
          var option = magias[resultado - 1][Math.floor(Math.random() * magias[resultado - 1].length)];
          if(message.author.id === '940744356376248320' && config.soso !== '0'){
            if(resultado === 4){
              option = magias[resultado - 1][18];
              config.soso = '0';
            }
          }
          if(message.author.id === '484949767265189909' && config.soso !== '0'){
            if(resultado === 4){
              option = magias[resultado - 1][18];
              config.soso = '0';
            }
          }
          msg.edit({
            content: `***¡Felicidades ${message.author}!, ${option.txt}***

${option.gif}`,
            components: []
          })
        } else {
          i.reply({ content: `¡Este botón no es tuyo!`, ephemeral: true });
        }
      });
    }
    else if (command === 'raza') {
      let razas = ["humano", "enano", "bruja", "elfo"]
      let jajas = [
        { txt: `***¡Felicidades ${message.author}!, has nacido como un miembro de la raza… ¡Humana!***\n\n- *Presiona el botón en el mensaje para saber la clase social de tu personaje.*`, gif: 'https://media.discordapp.net/attachments/573386324409581578/1236200928332218418/image0.gif?ex=66391f94&is=6637ce14&hm=ac13b10a51d794e0ff79776fa546977185ede2375f8161e694b6691c8c52ef5f&=&width=400&height=225' },
        { txt: `***¡Felicidades ${message.author}!, has nacido como un miembro de la raza… ¡Enano!***\n\n- *Presiona el botón en el mensaje para saber la clase social de tu personaje.*`, gif: 'https://cdn.discordapp.com/attachments/1236144999632998480/1236445471531335751/940744356376248320.gif' },
        { txt: `***¡Felicidades ${message.author}!, has nacido como un miembro de la raza… ¡Bruja!***\n\n- *Presiona el botón en el mensaje para saber la clase social de tu personaje.*`, gif: 'https://cdn.discordapp.com/attachments/1236144999632998480/1236446736235630714/940744356376248320.gif' },
        { txt: `***Vaya… al parecer ${message.author} ha nacido como… un miembro de la raza antigua de los Elfos.***`, gif: 'https://media.discordapp.net/attachments/573386324409581578/1236199200874696735/image0.gif?ex=663723b8&is=6635d238&hm=0303de7cd3af6e57eba2cc2c1e2a3b01d415b3fc31f5b8ff3f6412981584813c&' },
      ]
      var resultados = [
        { valor: 1, probabilidad: 0.45 },
        { valor: 2, probabilidad: 0.27 },
        { valor: 3, probabilidad: 0.27 },
        { valor: 4, probabilidad: 0.01 }
      ]
      const resultado = randomChoose(resultados);

      const row = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("roll")
            .setLabel('Roll')
            .setStyle(Discord.ButtonStyle.Success)
            .setEmoji("🎲"));


      if (resultado < 4) {
        var msg = await message.channel.send({
          content: `${jajas[resultado - 1].txt}

${jajas[resultado - 1].gif}`,
          components: [row]
        });

        const collector = msg.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, time: 600000 });

        collector.on('collect', i => {
          if (i.user.id === message.author.id) {
            let options = [];
            if (resultado === 1) {
              options = ["noble", "plebeyo", "plebeyo"];
            }
            else if (resultado === 2) {
              options = ["noble", "plebeyo", "plebeyo", "plebeyo", "plebeyo"];
            }
            else if (resultado === 3) {
              options = ["noble", "plebeyo", "plebeyo", "plebeyo", "plebeyo", "plebeyo", "plebeyo"];
            }
            const option = options[Math.floor(Math.random() * options.length)];
            msg.edit({
              content: `***¡Felicidades ${message.author}!, tu personaje ${razas[resultado - 1]} ha nacido como ${option}.***`,
              components: []
            })
          }
          else {
            i.reply({ content: `¡Este botón no es tuyo!`, ephemeral: true });
          }
        });
      } else {
        var msg = await message.channel.send({
          content: `${jajas[resultado - 1].txt}

${jajas[resultado - 1].gif}`
        })
      }
    }
    else if (command === 'grimorio') {
      var resultados = [
        { valor: 1, probabilidad: 0.96 },
        { valor: 2, probabilidad: 0.04 },
      ]
      var resultado = randomChoose(resultados);
      if(message.author.id === '940744356376248320' && config.soso !== '0'){
        if(config.soso === '1'){
          resultado = a[Math.floor(Math.random() * a.length)];
          if(resultado === 1) a = [1,2];
          if(resultado === 2) {
            a = [1,1]
          }
        }
        else if(config.soso === '2'){
          resultado = 2;
        }
      }

      if (resultado === 1) {
        message.channel.send(`***${message.author} Has sido elegido por el Grimorio… Ordinario.***

https://cdn.discordapp.com/attachments/1120951809926778920/1236750409826304102/grimorio_ordinario.gif?ex=66392513&is=6637d393&hm=3c921c7e524234261c3cbf9fae3f4ad5340eb8aadafa6e5e1683aae7bcfe5f41&`)
      }else{
        message.channel.send(`***¿Que están presenciando mis ojos?… Maravilloso… ${message.author} es uno de la minoría en ser elegido por el legendario Grimorio Dorado.***

https://cdn.discordapp.com/attachments/1120951540463706212/1239363674444005376/yuno.gif`)
      }
    }
  }
}
