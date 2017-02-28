'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Read the contents of a documentation asset.
 *
 * @param {Object} config The Holograph configuration object.
 * @param {String} asset The filename of a documentation asset.
 *
 * @throws {Error} Throws error if asset cannot be found.
 *
 * @returns {String} The contents of the documentation asset.
 */
function getDocumentationAssets(config, asset) {

  const assetPath = path.join(config.documentation_assets, asset);

  try {
    return fs.readFileSync(assetPath, 'utf8');
  }
  catch (e) {
    throw new Error(`${assetPath} could not be read.`);
  }

}

module.exports = getDocumentationAssets;