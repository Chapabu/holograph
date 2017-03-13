'use strict';

const getDocumentationAsset = require('../utils/getDocumentationAsset');
const mustache = require('mustache');

function extractPalette(sourceFile, config) {

  const template = getDocumentationAsset(config, '_swatches.html');

  // Fetch palettes.
  let match;
  const palettes = {};
  const pattern = /^(.*?)[:=](.*?);?\s*\/\/\s*hg-palette:(.*?)$/mg;

  while ((match = pattern.exec(sourceFile)) !== null) {

    const paletteName = match[3].trim();
    const colourVariable = match[1].trim();
    const colourValue = match[2].trim();

    // If the palette doesn't exist, then add it.
    if (!palettes[paletteName]) {
      palettes[paletteName] = [];
    }

    // Add our colour to the specified colour palette.
    palettes[paletteName].push({
      'name': colourVariable,
      'value': colourValue
    });

  }

  // convert to array
  const paletteList = [];

  for (let palette in palettes) {
    paletteList.push({
      'title': palette,
      'colours': palettes[palette]
    });
  }

  // Create markup.
  const mustacheOpts = {
    palettes: paletteList
  };

  return mustache.render(template, mustacheOpts);

}

module.exports = extractPalette;