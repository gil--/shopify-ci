const fs = require('fs');
require('dotenv').config();

const {
    GITHUB_EVENT_PATH,
} = process.env;

module.exports.getPrData = async () => {
    return await fs.readFile(GITHUB_EVENT_PATH, async (err, data) => {
        if (err) {
            throw err;
        }

        const content = JSON.parse(data.toString());
        return content;
    });
};