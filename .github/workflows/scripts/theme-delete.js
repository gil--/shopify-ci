#!/usr/bin/env node

const shopifyClient = require('./lib/shopify-client');
const prData = require('./lib/pr-data');
const theme = require('./lib/theme');

const listTheme = async () => {
    const data = prData.getPrData();
    
    console.log(data.action);
    
    if (data.action !== 'synchronize' || data.action !== 'closed') {
        // we only need to delete PR theme when it's a PR synchronization
        return;
    }
    
    const newThemeName = theme.getThemeName({ prNumber: data.number });
    const themeNameRegex = `GITHUB-PR-${data.number}`;

    await shopifyClient.theme.list()
        .then(themes => {
            themes.map(existingTheme => {
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