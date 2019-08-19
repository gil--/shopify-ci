#!/usr/bin/env node

// Credit: Code extracted from Shopify Slate-Tools
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const zipName = 'theme';
const zipPath = path.join(process.cwd(), `${zipName}.zip`);
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip');

output.on('close', () => {
    console.log(`✅ ${path.basename(zipPath)}: ${archive.pointer()} total bytes`);
});

archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
        console.log(err);
    } else {
        throw err;
    }
});

archive.on('error', (err) => {
    throw err;
});

archive.pipe(output);
archive.directory(path.join(process.cwd(), 'src'), '/');
archive.finalize();