#!/usr/bin/env node

const ngrok = require('ngrok');
const liveServer = require("live-server");
const shopifyClient = require('./lib/shopify-client');
require('dotenv').config();

const {
    SHOP_NAME,
    NGROK_AUTH_TOKEN,
    GITHUB_SHA,
} = process.env;

/*
    🌈 Create New Theme Based on Build
*/

(async function () {
    try {
        const params = {
            port: 8181, // Defaults to 8080
            open: false, // don't load browser
            file: "theme.zip", // Server the theme zip directly
            logLevel: 0, // 0 = errors only, 1 = some, 2 = lots
        };
        liveServer.start(params);

        const ngrokUrl = await ngrok.connect({
            authtoken: NGROK_AUTH_TOKEN,
            port: 8181,
        });

        const prNumber = 0;
        const themeName = `[PR - ${prNumber}] GITHUB-WORKFLOW ${GITHUB_SHA}`;
        const themeUrl = `${ngrokUrl}`;
        console.log('themeUrl', themeUrl);

        await shopifyClient.theme.create({
            name: themeName,
            src: themeUrl,
        })
            .then(theme => {
                console.log(theme);
                console.log(`\x1b[33m %s \x1b[0m`, `View Theme at https://${SHOP_NAME}.myshopify.com/?preview_theme_id=${theme.id}`)
                await ngrok.kill();
            })
            .catch(err => {
                console.error(err.response.body);
                process.exit(1);
            });
    } catch (e) {
        console.log(e);
    }
})();

