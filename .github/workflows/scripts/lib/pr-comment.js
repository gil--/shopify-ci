const comment = require('github-comment');
const fs = require('fs');
require('dotenv').config();

const {
    GITHUB_AUTH_TOKEN,
    GITHUB_REPOSITORY,
    GITHUB_EVENT_PATH,
} = process.env;

// Make a 💫
module.exports.makeAComment = async (commentContent) => {
    const prNumber = await fs.readFile(GITHUB_EVENT_PATH, (err, data) => {
        if (err) {
            throw err;
        }
        const content = JSON.parse(data.toString());
        console.log(content);
        console.log(content.number);
        
        if (content.number != null) {
            console.log('posting comment');
            await comment(GITHUB_AUTH_TOKEN, GITHUB_REPOSITORY, content.number, commentContent)
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }
    });    
};