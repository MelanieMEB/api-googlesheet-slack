const Hapi = require('@hapi/hapi');   // Import de Hapi
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
const host = process.env.h

const init = async () => {

    // Initialisation d'un nouveau serveur Hapi avec sa configuration
    const server = Hapi.server({ port, host });

    // Création d'une route GET, que l'on pourra appelé via http://localhost:300/tea-time
    server.route({
        method: 'GET',
        path: '/tea-time',
        handler: (request, h) => {
            return `Il est ${new Date().getHours()}h : c'est l'heure du thé !`;
        }
    });

    // Démarrage du serveur
    await server.start();
    console.log('Le serveur est lancé sur %s', server.info.uri);
};

// Gestion en cas d'erreur de l'Api
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();  // Lancement de l'initialisation
