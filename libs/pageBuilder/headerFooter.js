'use strict';

const fs = require('fs');

/**
 * Add a header and footer to a content snippet.
 *
 * @param {Object} config The Holograph configuration object.
 * @param {String} content A string of HTML content.
 *
 * @returns {String} The provided content string surrounded by a header and footer.
 */
function headerFooter(config, content) {
  let rawContent = fs.readFileSync(config.documentation_assets + '/_header.html', 'utf8');
  rawContent += content;
  rawContent += fs.readFileSync(config.documentation_assets +'/_footer.html', 'utf8');
  return rawContent;
}

module.exports = headerFooter;