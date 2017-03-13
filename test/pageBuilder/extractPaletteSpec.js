'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);
const loadFixture = require('../fixtures/loadFixture');
const proxyquire = require('proxyquire');
const mustacheStub = {};
const extractPalette = proxyquire('../../libs/pageBuilder/extractPalette', {
  '../utils/getDocumentationAsset': function () {
    return '<html></html>';
  },
  'mustache': mustacheStub
});

describe('extractPalette', function () {

  let spy;

  beforeEach(function () {
    spy = sinon.stub();
    mustacheStub.render = spy;
  });

  afterEach(function () {
    spy.reset;
  });

  it('uses the config defined swatch', function () {
    extractPalette('noop', {});
    expect(spy).to.have.been.calledWith('<html></html>');
  });


  it('extracts colours from CSS files', function () {
    const cssFixture = loadFixture('palettes/colourPalette.css');
    extractPalette(cssFixture, {});
    const expectedCssPalettes = {
      palettes: [{
        colours: [{
          name: "brand-primary",
          value: "#3f8e7a"
        }, {
          name: "brand-secondary",
          value: "#d4e05c"
        }],
        title: "Brand"
      }, {
        colours: [{
          name: "white",
          value: "white"
        }, {
          name: "grey",
          value: "#ccc"
        }, {
          name: "black",
          value: "#000000"
        }],
        title: "Monochrome"
      }]
    };
    expect(spy).to.have.been.calledWith(sinon.match.any, expectedCssPalettes);
  });

  it('extracts colours from SASS files', function () {
    const sassFixture = loadFixture('palettes/colourPalette.scss');
    extractPalette(sassFixture, {});
    const expectedSassPalettes = {
      palettes: [{
        colours: [{
          name: "$brand-primary",
          value: "#3f8e7a"
        }, {
          name: "$brand-secondary",
          value: "#d4e05c"
        }],
        title: "Brand"
      }, {
        colours: [{
          name: "$white",
          value: "white"
        }, {
          name: "$grey",
          value: "#ccc"
        }, {
          name: "$black",
          value: "#000000"
        }],
        title: "Monochrome"
      }]
    };
    expect(spy).to.have.been.calledWith(sinon.match.any, expectedSassPalettes);
  });

  it('extracts colours from LESS files', function () {
    const sassFixture = loadFixture('palettes/colourPalette.less');
    extractPalette(sassFixture, {});
    const expectedSassPalettes = {
      palettes: [{
        colours: [{
          name: "@brand-primary",
          value: "#3f8e7a"
        }, {
          name: "@brand-secondary",
          value: "#d4e05c"
        }],
        title: "Brand"
      }, {
        colours: [{
          name: "@white",
          value: "white"
        }, {
          name: "@grey",
          value: "#ccc"
        }, {
          name: "@black",
          value: "#000000"
        }],
        title: "Monochrome"
      }]
    };
    expect(spy).to.have.been.calledWith(sinon.match.any, expectedSassPalettes);
  });

it('extracts colours from STYL files', function () {
    const sassFixture = loadFixture('palettes/colourPalette.styl');
    extractPalette(sassFixture, {});
    const expectedSassPalettes = {
      palettes: [{
        colours: [{
          name: "$brand-primary",
          value: "#3f8e7a"
        }, {
          name: "$brand-secondary",
          value: "#d4e05c"
        }],
        title: "Brand"
      }, {
        colours: [{
          name: "$white",
          value: "white"
        }, {
          name: "$grey",
          value: "#ccc"
        }, {
          name: "$black",
          value: "#000000"
        }],
        title: "Monochrome"
      }]
    };
    expect(spy).to.have.been.calledWith(sinon.match.any, expectedSassPalettes);
  });

});