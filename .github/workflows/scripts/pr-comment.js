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
    console.log(data.toString());
    const prNumber = data && data.number;
    
    if (prNumber != null) {
        comment(GITHUB_AUTH_TOKEN, GITHUB_REPOSITORY, prNumber, 'This is a mother fucking comment.')
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }
});