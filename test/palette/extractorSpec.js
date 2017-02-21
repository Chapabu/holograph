'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiDeepMatch = require('chai-deep-match');
const paletteExtractor = require('../../libs/palette/extractor');
const path = require('path');

chai.use(chaiDeepMatch);

describe('palette extractor', function () {

  it('extracts colours from SASS files', function (done) {

    const sassFile = path.resolve(__dirname + '/../fixtures/palettes/colourPalette.scss');
    const extractColours = paletteExtractor(sassFile);
    const expectedSassColours = {
      'Brand': [{
          'name': '$brand-primary',
          'value': '#3f8e7a'
        },
        {
          'name': '$brand-secondary',
          'value': '#d4e05c'
        }
      ],
      'Monochrome': [{
          'name': '$white',
          'value': 'white'
        },
        {
          'name': '$grey',
          'value': '#ccc'
        },
        {
          'name': '$black',
          'value': '#000000'
        }
      ]
    };

    extractColours.then(function (colours) {
      expect(colours).to.deep.equal(expectedSassColours);
      done();
    });

  });

  it('extracts colours from LESS files', function (done) {

    const lessFile = path.resolve(__dirname + '/../fixtures/palettes/colourPalette.less');
    const extractColours = paletteExtractor(lessFile);
    const expectedLessColours = {
      'Brand': [{
          'name': '@brand-primary',
          'value': '#3f8e7a'
        },
        {
          'name': '@brand-secondary',
          'value': '#d4e05c'
        }
      ],
      'Monochrome': [{
          'name': '@white',
          'value': 'white'
        },
        {
          'name': '@grey',
          'value': '#ccc'
        },
        {
          'name': '@black',
          'value': '#000000'
        }
      ]
    };

    extractColours.then(function (colours) {
      expect(colours).to.deep.equal(expectedLessColours);
      done();
    });

  });

  it('extracts colours from Stylus files', function (done) {

    const stylFile = path.resolve(__dirname + '/../fixtures/palettes/colourPalette.styl');
    const extractColours = paletteExtractor(stylFile);
    const expectedStylusColours = {
      'Brand': [{
          'name': '$brand-primary',
          'value': '#3f8e7a'
        },
        {
          'name': '$brand-secondary',
          'value': '#d4e05c'
        }
      ],
      'Monochrome': [{
          'name': '$white',
          'value': 'white'
        },
        {
          'name': '$grey',
          'value': '#ccc'
        },
        {
          'name': '$black',
          'value': '#000000'
        }
      ]
    };

    extractColours.then(function (colours) {
      expect(colours).to.deep.equal(expectedStylusColours);
      done();
    });

  });

  it('extracts colours from CSS files', function (done) {

    const cssFile = path.resolve(__dirname + '/../fixtures/palettes/colourPalette.css');
    const extractColours = paletteExtractor(cssFile);
    const expectedCssColours = {
      'Brand': [{
          'name': 'brand-primary',
          'value': '#3f8e7a'
        },
        {
          'name': 'brand-secondary',
          'value': '#d4e05c'
        }
      ],
      'Monochrome': [{
          'name': 'white',
          'value': 'white'
        },
        {
          'name': 'grey',
          'value': '#ccc'
        },
        {
          'name': 'black',
          'value': '#000000'
        }
      ]
    };

    extractColours.then(function (colours) {
      expect(colours).to.deep.equal(expectedCssColours);
      done();
    });

  });

});