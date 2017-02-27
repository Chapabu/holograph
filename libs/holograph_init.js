'use strict';
var fs = require('fs');
var rmdir = require('rimraf');
var ncp = require('ncp').ncp;
var path = require('path');
var filterFiles = require('dive');
var allowedExtension = require('./utils/allowedExtension');

function setupBuildDir(dir, assets, callback) {
    var ncpOptions = {
        filter: function(filePath) {
            var relPath = path.relative(assets, filePath);
            if (relPath == '') {
                return true;
            }
            var fileName = path.basename(relPath);
            return (fileName[0] != '_');
        }
    };

    rmdir(dir, function(err) {
        if (err) {
            return callback(new Error(err.message));
        }

        fs.mkdir(dir, function(err) {
            if (err) {
                return callback(new Error(err.message));
            }

            if (assets) {
                ncp(assets, dir, ncpOptions, function(err) {
                    if (err) {
                        return callback(new Error('Couldn\'t find a directory, most likely ' + assets + ' is missing.'));
                    }

                    return callback();
                });
            } else {
                return callback();
            }
        });
    });
}

function copyDependencies(dir, deps, cb) {
    if (deps && deps.length) {
        var source = deps.shift();
        ncp(source, dir + '/' + path.basename(source), function(err) {
            if (err) {
                return cb(err);
            }
            return copyDependencies(dir, deps, cb);
        });
    } else {
        return cb();
    }
}

module.exports = function(config, callback) {
    var results = [];
    setupBuildDir(config.destination, config.documentation_assets, function(err) {
        if (err) {
            return callback(new Error(err.message));
        }

        copyDependencies(config.destination, config.dependencies, function(err) {
            if (err) {
                return callback(new Error(err.message));
            }

            if (Array.isArray(config.source) === false) {
                config.source = [ config.source ];
            }

            config.source.forEach(function(source, i) {
                filterFiles(source, function (err, file) {
                    if (err) {
                        return callback(new Error(err.message));
                    }

                    if (allowedExtension(file, config)) {
                        results.push(file);
                    }
                }, function() {
                    if (i === config.source.length-1) {
                        return callback(null, results);
                    }
                });
            });
        });
    });
};
