const comment = require('github-comment');
require('dotenv').config();

const {
    GITHUB_AUTH_TOKEN,
    GITHUB_REPOSITORY,
    GITHUB_EVENT_PATH,
} = process.env;

console.log(GITHUB_EVENT_PATH);
// get file and show contents

comment(GITHUB_AUTH_TOKEN, GITHUB_REPOSITORY, 17, 'This is a mother fucking comment.')
    .then(response => console.log(response))
    .catch(error => console.log(error))