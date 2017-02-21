'use strict';

const Promise = require('bluebird');
const byline = require('byline');
const fs = require('fs');

/**
 * Extract the colours from a Palette.
 *
 * @param {any} source
 */
function paletteExactractor(sourceFile) {

  return new Promise(function (resolve, reject) {

    const source = fs.createReadStream(sourceFile);

    // If there's an error with the primary stream, then reject the promise.
    source.on('error', function (err) {
      reject(err);
    });

    const sourceByLine = byline(source);

    // If there's an error with the per-line stream, then reject the promise.
    sourceByLine.on('error', function (err) {
      reject(err);
    });

    const pattern = /^(.*?)[:=](.*?);?\s*\/\/\s*hg-palette:(.*?)$/;

    let colours = {};

    sourceByLine.on('data', function (line) {

      // Check to see if we've matched a colour.
      const matches = pattern.exec(line);

      // If we have, then get its parts and push it into our return value.
      if (matches !== null && matches.length > 0) {

        const paletteName = matches[3].trim();

        // Ensure we've got a palette to add the colour to.
        if (typeof colours[paletteName] === 'undefined') {
          colours[paletteName] = [];
        }

        // Push the discovered colour onto the palette.
        colours[paletteName].push({
          'name': matches[1].trim(),
          'value': matches[2].trim(),
        });

      }

    });

    // Once we're done, resolve the promise.
    sourceByLine.on('end', function () {
      resolve(colours);
    });

  });

}

module.exports = paletteExactractor;