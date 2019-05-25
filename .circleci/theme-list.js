const Shopify = require('shopify-api-node');

require('dotenv').config();

const {
    SHOP_NAME,
    API_KEY,
    API_PASSWORD
} = process.env;

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