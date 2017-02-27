'use strict';

const allowedExtension = require('../../libs/utils/allowedExtension');
const chai = require('chai');
const expect = chai.expect;

describe('allowedExtension', function () {

  describe('default configuration', function () {

    it('returns true if file extension allowed in default configuration', function () {

      const allowedFile ='/tmp/sassFile.scss';
      expect(allowedExtension(allowedFile)).to.be.true;

    });

    it('returns false if file extension is not allowed in default configuration', function () {

      const disallowedFile ='/tmp/wordFile.docx';
      expect(allowedExtension(disallowedFile)).to.be.false;

    });

  });

  describe('overridden configuration', function () {

    const overriddenConfig = {
      custom_extensions: [
        '.rtf',
        '.docx'
      ]
    };

    it('returns true if file extension allowed in overridden configuration', function () {

      const allowedFile ='/tmp/wordFile.docx';
      expect(allowedExtension(allowedFile, overriddenConfig)).to.be.true;

    });

    it('returns false if file extension is not allowed in overridden configuration', function () {

      const disallowedFile ='/tmp/sassFile.scss';
      expect(allowedExtension(disallowedFile, overriddenConfig)).to.be.false;

    });

  });

});