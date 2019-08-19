#!/usr/bin/env node

const shopifyClient = require('./lib/shopify-client');

const listTheme = async () => {
    const themes = await shopifyClient.theme.list(); 
    console.log(themes);
};

listTheme();