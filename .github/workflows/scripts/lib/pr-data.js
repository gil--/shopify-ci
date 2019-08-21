const fs = require('fs');
require('dotenv').config();

const {
    GITHUB_EVENT_PATH,
} = process.env;

module.exports.getPrData = async () => {
    return JSON.parse(fs.readFileSync(GITHUB_EVENT_PATH));
    // return await fs.readFile(GITHUB_EVENT_PATH, async (err, data) => {
    //     if (err) {
    //         throw err;
    //     }

    //     const content = JSON.parse(data.toString());
    //     console.log('yo gil it\'s me, data man');
    //     return content;
    // });
};