#!/usr/bin/env node

const Shopify = require('shopify-api-node');

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

/*
    🌈 Create New Theme Based on Build
*/
const themeName = `CircleCI-${process.env.CIRCLE_SHA1}`; // CIRCLE_PR_NUMBER (only for forked PRs)
const themeUrl = `https://loving-turing-94c788.netlify.com/theme.zip`;

shopify.theme.create({
    name: themeName,
    src: themeUrl,
})
    .then(theme => {
        console.log(theme);
        console.log(`\x1b[33m %s \x1b[0m`, `View Theme at https://${SHOP_NAME}.myshopify.com/?preview_theme_id=${theme.id}`)
    })
    .catch(err => console.error(err.response.body));