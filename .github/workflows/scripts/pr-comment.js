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
    console.log('commentContent', commentContent);

    const prNumber = await fs.readFile(GITHUB_EVENT_PATH, (err, data) => {
        if (err) {
            throw err;
        }
        
        const content = JSON.parse(data.toString());
        console.log(content);
        return content && content.number;
    });

    console.log('prNumber', prNumber);
    
    if (prNumber != null) {
        console.log('posting comment');
        comment(GITHUB_AUTH_TOKEN, GITHUB_REPOSITORY, prNumber, commentContent)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }
};