const Hapi = require('@hapi/hapi');   // Import de Hapi
const port = process.env.PORT || 3000;
require('dotenv').config();
const teaService = require('./services/tea');
const reponseSlackSerializer = require('./serializer/response-slack');

function checkVerificationToken(request, h) {
    const sendedVerificationToken = request.payload.token;
    const expectedVerificationToken = process.env.VERIFICATION_TOKEN_SLACK;
    if (sendedVerificationToken === expectedVerificationToken) {
        return true;
    }
    return h.response('Seul notre application Slack a le droit d\'appeler cette route').code(401).takeover();
};

const init = async () => {

    // Initialisation d'un nouveau serveur Hapi avec sa configuration
    const server = Hapi.server({ port });

    // Création d'une route GET, que l'on pourra appelé via http://localhost:300/temps-infusion
    server.route({
        method: 'GET',
        path: '/tea-time',
        handler: (request, h) => {
            return `Il est ${new Date().getHours()}h : c'est l'heure du thé !`;
        }
    });

    // Création d'une route POST pour renvoyer un message à afficher sur Slack, que l'on pourra appelé via http://localhost:300/temps-infusion
    server.route({
        method: 'POST',
        path: '/temps-infusion',
        config: {
            pre: [ { method: checkVerificationToken }]
        },
        handler: (request, h) => {
            const teaColor = request.payload.text;
            const infusionTime = teaService.getInfusionTime(teaColor);
            const message = `Le temps d'infusion pour un thé ${teaColor} est de ${infusionTime}.`
            return reponseSlackSerializer.simpleResponse(message);
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
