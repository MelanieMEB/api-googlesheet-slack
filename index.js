const Hapi = require('@hapi/hapi');   // Import de Hapi
const port = process.env.PORT || 3000;

const init = async () => {

    // Initialisation d'un nouveau serveur Hapi avec sa configuration
    const server = Hapi.server({ port });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return { server: 'OK' };
        }
    });

    server.route({
        method: 'POST',
        path: '/tips-a11y',
        handler: (request, h) => {
            return { text: 'OK' };
        }
    });

    // Démarrage du serveur
    await server.start();
    console.log('Le serveur est lancé sur %s', server.info.uri);
};

// Gestion en cas d'erreur de l'API
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();  // Lancement de l'initialisation
