const googleSheetService = require('../../services/google-sheet.js');
const axios = require('axios');

jest.mock('axios');

describe('getA11YTip', () => {
    beforeEach(() => {
        const valuesFromGoogleSheetApi = {
            data :{
            "range": "astuces!A1:E500",
            "majorDimension": "ROWS",
            "values": [
            [
                "Titre",
                "Sujet",
                "Message",
                "Lien"
            ],
            [
                "Titre exemple",
                "Mon sujet",
                "Mon message",
                "https://melaniemeb.github.io/blog/"
            ]
            ]
        }
    }

        axios.get.mockResolvedValue(valuesFromGoogleSheetApi);
    });

    test('return one tips from Google Sheet document', async () => {
        const expectedTips = {
            "Message": "Mon message",
            "Sujet": "Mon sujet",
            "Titre": "Titre exemple",
            "Lien": "https://melaniemeb.github.io/blog/"
        }
        const result = await googleSheetService.getA11YTip();

        expect(result).toEqual(expectedTips);
    });
});
