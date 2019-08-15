const comment = require('github-comment');
const fs = require('fs');
require('dotenv').config();

const {
    GITHUB_AUTH_TOKEN,
    GITHUB_REPOSITORY,
    GITHUB_EVENT_PATH,
} = process.env;

let GithubEventData = null;

fs.readFile(GITHUB_EVENT_PATH, function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data.toString());
    githubPRNumber = data && data.number;
});

if (typeof githubPRNumber !== null) {
    comment(GITHUB_AUTH_TOKEN, GITHUB_REPOSITORY, githubPRNumber, 'This is a mother fucking comment.')
        .then(response => console.log(response))
        .catch(error => console.log(error))
}