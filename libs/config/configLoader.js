'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const extend = require('extend');
const Promise = require('bluebird');

/**
 * Load configuration from files.
 *
 * @class
 */
function configLoader() {
  this.defaultConfig = require('./defaultConfig');
}

/**
 * Load configuration from either a JS or YAML file.
 *
 * @throws {Error} Thrown if no YAML or JavaScript config file is found.
 *
 * @returns {object} Holograph configuration.
 */
configLoader.prototype.load = function () {

  if (this.hasJSConfig()) {
    return this.mergeDefaultConfig(this.loadJsConfig());
  }

  if (this.hasYAMLConfig()) {
    return this.mergeDefaultConfig(this.loadYamlConfig());
  }

  // If we've not been able to find a config file, then bomb out.
  throw new Error('No holograph configuration file found.');

};

/**
 * Load configuration from either a JS or YAML file into a promise.
 *
 * @returns {Promise} A promise that resolves with either the loaded configuration, or rejects with any errors raised.
 */
configLoader.prototype.loadPromise = function () {

  let config;

  return new Promise(function(resolve, reject) {

    try {
      config = this.load();
    }
    catch(err) {
      reject(err);
    }

    resolve(config);

  }.bind(this));

};

/**
 * Merge loaded configuration with defaults.
 *
 * @returns {object} Loaded configuration merged with default required Holograph config.
 */
configLoader.prototype.mergeDefaultConfig = function (loadedConfig) {
  return extend(this.defaultConfig, loadedConfig);
};

/**
 * Load a JavaScript based configuration file.
 *
 * @returns {object} Holograph configuration loaded from a JavaScript file.
 */
configLoader.prototype.loadJsConfig = function () {
  return require('./holograph_config');
};

/**
 * Load a YAML based configuration file.
 *
 * @returns {object} Holograph configuration loaded from a YAML file.
 */
configLoader.prototype.loadYamlConfig = function () {
  // We don't really need to wrap this in a try/catch as chekcing for the existence of this file hapens directly prior
  // to loading it in. Maybe.
  const yamlConfig = fs.readFileSync('holograph_config.yml');
  return yaml.safeLoad(yamlConfig);
};

/**
 * Check to see if a YAML config file exists.
 *
 * @returns {bool} True if a YAML config file exists, false if not.
 */
configLoader.prototype.hasYAMLConfig = function () {

  try {
    fs.statSync('holograph_config.yml');
  } catch (err) {
    return false;
  }

  return true;

};

/**
 * Check to see if a JavaScript config file exists.
 *
 * @returns {bool} True if a JavaScript config file exists, false if not.
 */
configLoader.prototype.hasJSConfig = function () {

  try {
    fs.statSync('holograph_config.js');
  } catch (err) {
    return false;
  }

  return true;

};

module.exports = configLoader;