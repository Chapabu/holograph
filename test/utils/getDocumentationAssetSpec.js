'use strict';

const mock = require('mock-fs');
const chai = require('chai');
const expect = chai.expect;
const getDocumentationAsset = require('../../libs/utils/getDocumentationAsset');

describe('getDocumentationAsset', function () {

  const mockConfig = {
    documentation_assets: './assets',
  };

  beforeEach(function () {

    mock({
      'assets': {
        '_mockHeader.html': '<html><head></head><body>'
      }
    });

  });

  afterEach(function () {

    mock.restore();

  });

  it('gets documentation assets', function () {

    const docAsset = getDocumentationAsset(mockConfig, '_mockHeader.html');
    expect(docAsset).to.equal('<html><head></head><body>');

  });

  it('throws an error if no asset was found', function () {

    const docAsset = function () {
      getDocumentationAsset(mockConfig, '_mockFooter.html');
    };

    expect(docAsset).to.throw(Error, '_mockFooter.html could not be read.');

  });

});