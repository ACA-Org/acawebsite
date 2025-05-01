const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const { navbarLinks } = require("./navbarLinks.js");

const urls = navbarLinks;

async function saveHtml(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;

    const urlObj = new URL(url);
    const pathname = urlObj.pathname
      .replace(/^\//, "")
      .replace(/[\/\\?%*:|"<>]/g, "-");
    const filename = pathname || "index";
    const filePath = path.join(__dirname, "source", `${filename}.html`);

    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, html, "utf8");

    console.log(`Saved HTML from ${url} to ${filePath}`);
  } catch (err) {
    console.error(`Failed to save HTML from ${url}: ${err.message}`);
  }
}

(async () => {
  await Promise.all(urls.map(saveHtml));
})();
