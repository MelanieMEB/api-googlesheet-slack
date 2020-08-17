const responseSlackSerializer = require('../../serializers/response-slack.js');

describe('createResponseForSlack', () => {
    test('return response for Slack', () => {
        const tips = {
            "Message": "Mon message",
            "Sujet": "Mon sujet",
            "Titre": "Titre exemple",
            "Lien": "https://melaniemeb.github.io/blog/"
        }
        const expectResponse = {
            "blocks": [
                {
                    "type": "divider"
                },
                {
                    "text": {
                        "text": ":a11y: Astuce A11Y :a11y:",
                        "type": "mrkdwn"
                    },
                    "type": "section"
                },
                {
                    "type": "divider"
                },
                {
                    "text": {
                        "text": ":book: *TITRE EXEMPLE* :book: \n _Mon sujet_ ",
                        "type": "mrkdwn"
                    },
                    "type": "section"
                },
                {
                    "type": "divider"
                },
                {
                    "text": {
                        "text": "Mon message \n :link: : https://melaniemeb.github.io/blog/",
                        "type": "mrkdwn"
                    },
                    "type": "section"
                },
                {
                    "type": "divider"
                }
            ],
            "response_type": "in_channel"
        };
        expect(responseSlackSerializer.createResponseForSlack(tips)).toEqual(expectResponse);
    });
});
