const comment = require('github-comment');
const fs = require('fs');
require('dotenv').config();

const {
    GITHUB_AUTH_TOKEN,
    GITHUB_REPOSITORY,
    GITHUB_EVENT_PATH,
} = process.env;

console.log(GITHUB_EVENT_PATH);
fs.readFile(__dirname + GITHUB_EVENT_PATH, function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data.toString());
});
// get file and show contents

comment(GITHUB_AUTH_TOKEN, GITHUB_REPOSITORY, 18, 'This is a mother fucking comment.')
    .then(response => console.log(response))
    .catch(error => console.log(error))