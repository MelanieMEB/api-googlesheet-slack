const axios = require('axios');
const _ = require('lodash');
require('dotenv').config();

const URL_SPREADSHEET_API = 'https://sheets.googleapis.com/v4/spreadsheets'; // URL de l'api Google Sheet
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID; // ID du document
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Clé API Google
const SPREADSHEET_VALUES = 'astuces!A1:E500'; // Les valeurs que l'on souhaite remonter du document

function getGoogleSheetURL() {
    return `${URL_SPREADSHEET_API}/${GOOGLE_SHEET_ID}/values/${SPREADSHEET_VALUES}?key=${GOOGLE_API_KEY}`;
}

function getDataFromGoogleSheet () {
    const url = getGoogleSheetURL();
    return axios.get(url)
        .then(response => response.data.values)
        .catch(error => console.log(error));
}

function getRandomTips(tipsFromGoogleSheet) {
    const titles = tipsFromGoogleSheet.shift();
    const randomTip = tipsFromGoogleSheet[Math.floor(Math.random() * (tipsFromGoogleSheet.length))];
    return _.zipObject(titles, randomTip);
}
module.exports = {
    async getA11YTip() {
        const tipsFromGoogleSheet = await getDataFromGoogleSheet();
        return getRandomTips(tipsFromGoogleSheet);
    }
};
