require('dotenv').config();

const {
    GITHUB_SHA,
    GITHUB_REF,
} = process.env;

module.exports.getThemeName = ({ prNumber }) => {
    const commitSha = GITHUB_SHA && GITHUB_SHA.substring(0, 6);
    console.log(GITHUB_REF);

    if (prNumber) {
        return `GITHUB-PR-${prNumber} ${commitSha}`;
    } else {
        return `GITHUB ${GITHUB_REF} ${commitSha}`;
    }
};