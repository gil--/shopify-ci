#!/usr/bin/env node

require('dotenv').config();
const shopifyClient = require('./lib/shopify-client');
const makeAComment = require('./lib/pr-comment').makeAComment;

const {
    SHOP_NAME,
    GITHUB_SHA,
} = process.env;

const prNumber = 0;
const themeName = `[PR - ${prNumber}] GITHUB-WORKFLOW ${GITHUB_SHA}`;
const maxWait = 300000; // 3 minutes
const waitInterval = 10000; // 10 seconds
let wait = 0; // start at 0

const checkIfThemeIsPreviewable = () => {
    shopifyClient.theme.list()
        .then(async themes => {
            const result = themes.filter(theme => {
                return theme.name === themeName
            })

            if (!result.length) {
                console.log(`📛 No theme found matching Name of ${themeName}`);
                process.exit(1);
            }

            if (result[0].previewable) {
                console.log('✅ Theme is now previewable!')
                console.log(`\x1b[33m %s \x1b[0m`, `https://${SHOP_NAME}.myshopify.com/?preview_theme_id=${result[0].id}`)
                await makeAComment(`
##### Successfully Deployed Shopify Theme Preview
                
[View Preview on Shopify](https://${SHOP_NAME}.myshopify.com/?preview_theme_id=${result[0].id})                
`);
                process.exit();
            } else {
                if (wait >= maxWait) {
                    console.log('📛 Waited 5 minutes with no change to theme Previable. Exiting.')
                    process.exit(1);
                }

                wait += waitInterval;
                console.log('😅 Theme not yet previewable...');
                t = setTimeout(checkIfThemeIsPreviewable, waitInterval);
            }
        })
        .catch(err => {
            if (err.response) {
                console.error(err.response.body)
            } else {
                console.error(err);
            }
            process.exit();
        });
};

checkIfThemeIsPreviewable();