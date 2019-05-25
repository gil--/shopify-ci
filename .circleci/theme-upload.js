const Shopify = require('shopify-api-node');
//const program = require('commander');
const bot = require('circle-github-bot').create();

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
//console.log(`${process.env.CIRCLE_BUILD_URL}/artifacts/0/tmp/artifacts/theme.zip`);
console.log(`${process.env.CIRCLE_BUILD_URL}/artifacts/0/${process.env.HOME}/project/starter-theme.zip`);
shopify.theme.create({
    name: `Debut-${Date.now()}`,
    src: `${process.env.CIRCLE_BUILD_URL}/artifacts/0/${process.env.HOME}/project/starter-theme.zip`,
}).then(theme => {
    console.log(theme);
    console.log(`\x1b[33m %s \x1b[0m`, `View Theme at https://${SHOP_NAME}.myshopify.com/?preview_theme_id=${theme.id}`)

    // bot.comment(`
    //     <h3>Live Demo of Shopify Theme</h3>
    //     Demo: <strong>${bot.artifactLink(`https://${SHOP_NAME}.myshopify.com/?preview_theme_id=${theme.id}`, 'view theme demo')}</strong>
    // `);

}).catch(err => console.error(err.response.body));


// bot.comment(`
//         <h3>Live Demo of Shopify Theme</h3>
//     `);