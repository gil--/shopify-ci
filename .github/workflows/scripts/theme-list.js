const Shopify = require('shopify-api-node');
const makeAComment = require('./pr-comment');
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
    process.exit(1);
}

/*
    📡 Initialize Shopify API Creds
*/
const shopify = new Shopify({
    shopName: SHOP_NAME,
    apiKey: API_KEY,
    password: API_PASSWORD,
});

shopify.theme.list().then(themes => {
    console.log(themes);
}, err => console.error(err));

makeAComment('This is a mother fucking comment.');