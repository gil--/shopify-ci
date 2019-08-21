const fs = require('fs');
require('dotenv').config();

const {
    GITHUB_EVENT_PATH,
} = process.env;

module.exports.getPrData = () => {
    return JSON.parse(fs.readFileSync(GITHUB_EVENT_PATH));
};