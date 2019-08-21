require('dotenv').config();

const {
    GITHUB_SHA,
} = process.env;

module.exports.getThemeName = ({ prNumber }) => {
    const commitSha = GITHUB_SHA && GITHUB_SHA.substring(0, 6);
    return `GITHUB-PR-${prNumber} ${commitSha}`;
};