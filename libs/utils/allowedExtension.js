'use strict';

const path = require('path');
const defaultAllowedExtensions = [
  '.css',
  '.scss',
  '.less',
  '.sass',
  '.styl',
  '.js',
  '.md',
  '.markdown'
];

/**
 * Check to see if a file has an extension allowed by Holograph.
 *
 * @param {String} filepath The path to a file being checked.
 * @param {Object} config The Holograph configuration object.
 *
 * @returns {Boolean} True if the file has a supported extension, false if not.
 */
function allowedExtension(filepath, config) {

  // Config should always be passed, but it's better to be safe.
  config = config || {};

  // Defer to provided config if it's available.
  const allowedExtensions = config.custom_extensions || defaultAllowedExtensions;

  return allowedExtensions.indexOf(path.extname(filepath)) !== -1;

}

module.exports = allowedExtension;