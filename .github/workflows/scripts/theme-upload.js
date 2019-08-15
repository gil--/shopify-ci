const Shopify = require('shopify-api-node');
const program = require('commander');
require('dotenv').config();

/*
    🎨 Get Theme Url from Arguments
*/
let themeUrl = null;

program
    .version('0.0.1')
    .option('-t, --theme [url]', 'Add the specified theme.zip url [url]')
    .parse(process.argv);

if (!program.theme) {
    console.log('\x1b[31m%s\x1b[0m\x1b[33m %s \x1b[0m', '🔔 Missing theme url. Add:', '--theme [url]');
    process.exit();
} else {
    themeUrl = program.theme;
}

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
shopify.theme.create({
    name: `Debut-${Date.now()}`,
    src: themeUrl,
}).then(theme => {
    console.log(theme);
    console.log(`\x1b[33m %s \x1b[0m`, `View Theme at https://${SHOP_NAME}.myshopify.com/?preview_theme_id=${theme.id}`)
}, err => console.error(err));
