'use strict';

const getDocumentationAsset = require('../utils/getDocumentationAsset');

/**
 * Add a header and footer to a content snippet.
 *
 * @param {Object} config The Holograph configuration object.
 * @param {String} content A string of HTML content.
 *
 * @returns {String} The provided content string surrounded by a header and footer.
 */
function headerFooter(config, content) {
  let rawContent = getDocumentationAsset(config, '_header.html');
  rawContent += content;
  rawContent += getDocumentationAsset(config, '_footer.html');
  return rawContent;
}

module.exports = headerFooter;