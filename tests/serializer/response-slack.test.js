const responseSlackSerializer = require('../../serializer/response-slack.js');

describe('simpleResponse', () => {
    test('return response with only text', () => {
        const message = 'Test Message';
        const expectReponse = {
            text: message
        };
        expect(responseSlackSerializer.simpleReponse(message)).toEqual(expectReponse);
    });
});

