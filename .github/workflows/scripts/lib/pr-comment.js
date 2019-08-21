const comment = require('github-comment');
require('dotenv').config();

const {
    GITHUB_TOKEN,
    GITHUB_REPOSITORY,
} = process.env;

// Make a 💫
module.exports.makeAComment = async ({ number, message }) => {
    if (number != null) {
        await comment(GITHUB_TOKEN, GITHUB_REPOSITORY, number, message)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }
};