module.exports = {
    createResponseForSlack(tip) {
        const resp = {
            response_type: 'in_channel',
            'blocks': [
                {
                    'type': 'divider'
                },
                {
                    'type': 'section',
                    'text': {
                        'type': 'mrkdwn',
                        'text': ':a11y: Astuce A11Y :a11y:'
                    }
                },
                {
                    'type': 'divider'
                },
                {
                    'type': 'section',
                    'text': {
                        'type': 'mrkdwn',
                        'text': `:book: *${tip['Titre'].toUpperCase()}* :book: \n _${tip['Sujet']}_ `
                    }
                },
                {
                    'type': 'divider'
                },
                {
                    'type': 'section',
                    'text': {
                        'type': 'mrkdwn',
                        'text': `${tip['Message']} \n :link: : ${tip['Lien']}`
                    }
                },
                {
                    'type': 'divider'
                }
            ]
        };
        return resp;
    }
}
