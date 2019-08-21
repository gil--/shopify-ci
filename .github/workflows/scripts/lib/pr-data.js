const fs = require('fs');
require('dotenv').config();

const {
    GITHUB_EVENT_PATH,
} = process.env;

const prData = async () => {
    return await fs.readFile(GITHUB_EVENT_PATH, async (err, data) => {
        console.log('ok gil1!');
        
        if (err) {
            throw err;
            process.exit(1);
        }

        console.log('ok gil2!');

        const content = JSON.parse(data.toString());
        
        console.log(content);
        return content
    });
};

module.exports = prData;