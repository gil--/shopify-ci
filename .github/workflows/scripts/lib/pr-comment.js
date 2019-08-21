const comment = require('github-comment');
const fs = require('fs');
require('dotenv').config();

const {
    GITHUB_TOKEN,
    GITHUB_REPOSITORY,
} = process.env;

// Make a 💫
module.exports.makeAComment = async ({ number, message }) => {
    console.log(GITHUB_TOKEN);
    console.log(GITHUB_REPOSITORY);
    console.log(number);
    if (number != null) {
        await comment(GITHUB_TOKEN, GITHUB_REPOSITORY, number, message)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }
};