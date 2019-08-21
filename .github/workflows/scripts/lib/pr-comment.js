const comment = require('github-comment');
const fs = require('fs');
require('dotenv').config();

const {
    GITHUB_AUTH_TOKEN,
    GITHUB_REPOSITORY,
} = process.env;

// Make a 💫
module.exports.makeAComment = async ({ prNumber, message }) => {
    if (content.number != null) {
        await comment(GITHUB_AUTH_TOKEN, GITHUB_REPOSITORY, prNumber, message)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }
};