const comment = require('github-comment');
const fs = require('fs');
require('dotenv').config();

const {
    GITHUB_AUTH_TOKEN,
    GITHUB_REPOSITORY,
    GITHUB_EVENT_PATH,
} = process.env;

fs.readFile(GITHUB_EVENT_PATH, (err, data) => {
    if (err) {
        throw err;
    }
    const content = JSON.parse(data.toString());
    const prNumber = content && content.number;
    
    if (prNumber != null) {
        console.log('posting comment');
        comment(GITHUB_AUTH_TOKEN, GITHUB_REPOSITORY, prNumber, 'This is a mother fucking comment.')
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }
});