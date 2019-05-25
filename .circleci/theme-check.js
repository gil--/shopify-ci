#!/usr/bin/env node

const Shopify = require('shopify-api-node');
const github = require('ci-github')
const Github = github.create()

require('dotenv').config();

/*
💪 Get Environment Variables
*/
const {
    SHOP_NAME,
    API_KEY,
    API_PASSWORD
} = process.env;

if (!SHOP_NAME || !API_KEY || !API_PASSWORD) {
    console.log('\x1b[31m%s\x1b[0m \x1b[1m%s\x1b[0m', '🔔 Missing required ENV variables. Make sure the following exist:', 'SHOP_NAME, API_KEY, API_PASSWORD');
    process.exit();
}

/*
    📡 Initialize Shopify API Creds
*/
const shopify = new Shopify({
    shopName: SHOP_NAME,
    apiKey: API_KEY,
    password: API_PASSWORD,
});

const themeName = `CircleCI-${process.env.CIRCLE_SHA1}`;
const maxWait = 300000; // 5 minutes
const waitInterval = 15000; // 15 seconds
let wait = 0; // start at 0
let t;

const checkIfThemeIsPreviewable = () => {
    shopify.theme.list()
        .then(themes => {
            const result = themes.filter(theme => {
                return theme.name === themeName
            })

            if (!result.length) {
                console.log(`📛 No theme found matching Name of ${themeName}`);
                //clearInterval(t);
                process.exit();
            }

            if (result[0].previewable) {
                console.log('✅ Theme is now previewable!')
                console.log(`\x1b[33m %s \x1b[0m`, `https://${SHOP_NAME}.myshopify.com/?preview_theme_id=${result[0].id}`)
                Github.comment(`[https://${SHOP_NAME}.myshopify.com/?preview_theme_id=${result[0].id}](View Preview of Changes)
                > This comment was made automatically by CircleCI`);
                //clearInterval(t);
                process.exit();
            } else {
                if (wait >= maxWait) {
                    console.log('📛 Waited 5 minutes with no change to theme Previable. Exiting.')
                    //clearInterval(t);
                    process.exit();
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

            //clearInterval(t);
            process.exit();
        });
};

checkIfThemeIsPreviewable();