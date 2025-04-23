const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const sourceDir = path.join(__dirname, 'source');
const outputDir = path.join(__dirname, 'markdown');

const turndownService = new TurndownService();

// Helper to remove unwanted tags
function cleanDom($container) {
    $container.find('script, style, noscript').remove();
    return $container.html();
}

async function convertFile(filename) {
    const inputPath = path.join(sourceDir, filename);
    const outputName = filename.replace(/\.html$/, '.md');
    const outputPath = path.join(outputDir, outputName);

    try {
        const html = await fs.readFile(inputPath, 'utf8');
        const $ = cheerio.load(html);
        const containers = $('.ContentItemContainer');

        if (!containers.length) {
            console.warn(`No .Class-Name found in ${filename}`);
            return;
        }

        const markdownBlocks = [];

        containers.each((_, el) => {
            const $el = $(el).clone();
            const cleanedHtml = cleanDom($el);
            const markdown = turndownService.turndown(cleanedHtml);
            markdownBlocks.push(markdown);
        });

        const fullMarkdown = markdownBlocks.join('\n\n---\n\n'); // Optional separator between blocks

        await fs.ensureDir(outputDir);
        await fs.writeFile(outputPath, fullMarkdown, 'utf8');
        console.log(`Converted ${filename} to Markdown at ${outputPath}`);
    } catch (err) {
        console.error(`Failed to convert ${filename}: ${err.message}`);
    }
}

async function run() {
    const files = await fs.readdir(sourceDir);
    const htmlFiles = files.filter((f) => f.endsWith('.html'));

    await Promise.all(htmlFiles.map(convertFile));
}

run();
