const comment = require('github-comment');
const fs = require('fs');
require('dotenv').config();

const {
    GITHUB_AUTH_TOKEN,
    GITHUB_REPOSITORY,
    GITHUB_EVENT_PATH,
} = process.env;

// Make a 💫
export default makeAComment = async (commentContent) => {
    const prNumber = await fs.readFile(GITHUB_EVENT_PATH, (err, data) => {
        if (err) {
            throw err;
        }
        
        const content = JSON.parse(data.toString());
        return content && content.number;
    });
    
    if (prNumber != null) {
        console.log('posting comment');
        comment(GITHUB_AUTH_TOKEN, GITHUB_REPOSITORY, prNumber, commentContent)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }
};