const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ORIGIN = 'https://aca.org';
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
const dom = new JSDOM(html);
const document = dom.window.document;

const links = Array.from(document.querySelectorAll('a'))
    .map(a => a.getAttribute('href'))
    .filter(Boolean)
    .map(href => href.startsWith('http') ? href : `${ORIGIN}${href}`);

const output = `const navbarLinks = ${JSON.stringify(links, null, 2)};\n\nexport default navbarLinks;\n`;

fs.writeFileSync(path.join(__dirname, 'navbarLinks.js'), output);

console.log(`✅ Extracted ${links.length} links to navbarLinks.js`);
