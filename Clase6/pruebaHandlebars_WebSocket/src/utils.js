var { fileURLToPath } = require("url");
var { dirname } = require("path");

const __filname = fileURLToPath(import.meta.url);
const __dirname = dirname(__filname);

module.exports = __dirname;