'use strict';

const chai = require('chai');
const expect = chai.expect;
const mock = require('mock-fs');
const headerFooter = require('../../libs/pageBuilder/headerFooter');

describe('headerFooter', function () {

  const config = {
    'documentation_assets': './node_modules/holograph/assets'
  };

  beforeEach(function () {
    mock({
      'node_modules': {
        'holograph': {
          assets: {
            '_header.html': '<header><h1>I am a header</h1></header>',
            '_footer.html': '<footer>I am a footer</footer>'
          }
        }
      }
    });
  });

  afterEach(function () {
    mock.restore();
  });

  it ('surrounds content with a header and footer', function () {

    const headerFooterOutput = headerFooter(config, '<p>I am some content</p>');
    let expectation  = '<header><h1>I am a header</h1></header>';
        expectation += '<p>I am some content</p>';
        expectation += '<footer>I am a footer</footer>';

    expect(headerFooterOutput).to.equal(expectation);

  });

});