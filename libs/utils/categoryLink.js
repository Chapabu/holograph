'use strict';

/**
 * Convert a catagegory into a lowercase, stripped link-safe string.
 *
 * @param {String} category The category name to convert.
 *
 * @returns {String} The category name lowercased and made link safe.
 */
function categoryLink(category) {
  return category
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase() + '.html';
}

module.exports = categoryLink;