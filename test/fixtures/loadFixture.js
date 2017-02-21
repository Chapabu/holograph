'use strict';

const fs = require('fs');
const path = require('path');


/**
 * Get a fixture.
 *
 * @param {String} fixturePath
 *
 * @returns {any} The required fixture.
 */
module.exports = function (fixturePath) {
  const fullFixturePath = path.join(__dirname, fixturePath);
  return fs.readFileSync(fullFixturePath);
};