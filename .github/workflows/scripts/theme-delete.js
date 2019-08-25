#!/usr/bin/env node

const shopifyClient = require('./lib/shopify-client');
const prData = require('./lib/pr-data');
const theme = require('./lib/theme');

const listTheme = async () => {
    const data = prData.getPrData();
    const newThemeName = theme.getThemeName({ prNumber: data.number });
    const themeNameRegex = `GITHUB-PR-${data.number}`;
    console.log('data.number', data.number);

    await shopifyClient.theme.list()
        .then(themes => {
            themes.map(existingTheme => {
                console.log('existingTheme.name', existingTheme.name);
                console.log('themeNameRegex', themeNameRegex);
                console.log(existingTheme);

                if (existingTheme.name.includes(themeNameRegex)) {
                    if (existingTheme.name !== newThemeName && existingTheme.role !== 'main') {
                        console.log(`Deleting ${existingTheme.name}`);
                        shopifyClient.theme.delete(existingTheme.id);
                    }
                }
            })
        }, err => console.error(err)); 
};

listTheme();